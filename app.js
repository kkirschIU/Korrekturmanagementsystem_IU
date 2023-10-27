const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const session = require('express-session'); // Express-Session hinzufügen
const path = require('path');
const multer = require('multer');
//const uploader = multer({ dest: 'uploads/' }); // Hier wird der Speicherort für die Dateien festgelegt
const fs = require('fs');
const directoryPath = './public/uploads/';
const i18n = require('i18n');
const cookieParser = require('cookie-parser');


// Konfigurieren Sie Multer für den Dateiupload
const storage = multer.diskStorage({
    destination: './public/uploads/', // Verzeichnis, in dem die Dateien gespeichert werden
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage
  });

const app = express();
const port = 3001;

i18n.configure({
    locales: ['en', 'de'],  // Unterstützte Sprachen
    defaultLocale: 'de',    // Standardsprache
    directory: __dirname + '/language', // Verzeichnis mit den Übersetzungsdateien
});

app.use(i18n.init);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Hier den relativen Pfad zur HTML-Datei angeben
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.locals.user;
app.use(cookieParser());
//app.use(express.static(__dirname + '/uploads'));

//app.set('uploads', path.join(__dirname, 'uploads')); // Hier den relativen Pfad zur HTML-Datei angeben


// Express-Session-Konfiguration
app.use(session({
    secret: 'geheimnis', // Dies sollte sicherer sein
    resave: false,
    saveUninitialized: true
}));

// Legt die Start-Sprache für die Sitzung fest (wenn keine gesetzt ist)
app.use((req, res, next) => {
       // Hier wird geprüft, ob ein 'locale'-Cookie im Request vorhanden ist.
       const userLocale = req.cookies.locale;

       // Standardmäßig wird 'de' verwendet, wenn kein 'locale'-Cookie gefunden wird.
    const defaultLocale = 'de';

    // Setze die ausgewählte Sprache basierend auf dem Cookie oder einer anderen Logik.
    // Du kannst hier auch auf Benutzerpräferenzen oder den Benutzeragenten zugreifen.
    if (userLocale) {
        // Wenn das 'locale'-Cookie bereits gesetzt ist, lassen Sie es unverändert.
        res.locals.locale = userLocale;
    } else {
        // Wenn kein 'locale'-Cookie vorhanden ist, setze es auf die Standardsprache.
        res.locals.locale = defaultLocale;
        // Du könntest es auch auf 'en' setzen, wenn 'de' nicht gefunden wurde.
    }

    // Setze die Sprache für die i18n-Bibliothek.
    i18n.setLocale(req, res.locals.locale);
   
       next();
  });

  const pool = mysql.createPool({
    connectionLimit: 10, // Anzahl der Verbindungen im Pool
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'report'
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
      return;
    }
  });

/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'report',
    keepAlive: true
});

connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err);
    } else {
        console.log('Erfolgreich zur MySQL-Datenbank verbunden');
    }
});*/

fs.access(directoryPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`Verzeichnis ${directoryPath} existiert nicht oder Sie haben keinen Zugriff.`);
    } else {
        console.log(`Verzeichnis ${directoryPath} existiert und Sie haben Zugriff.`);
    }
});



app.get('/', (req, res) => {
    // Prüfe, ob bereits ein Sprach-Cookie vorhanden ist, andernfalls verwende die Standardsprache 'en'.


    res.render('login');
    //res.sendFile(__dirname + '/public/login.ejs');
});

app.get('/login', (req, res) => {
    //res.sendFile(__dirname + '/public/login.ejs');
    res.render('login');
});

app.post('/login', (req, res) => {
    // Benutzer authentifizieren und Session erstellen, wenn erfolgreich
    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Fehler bei der Anmeldung');
        } else {
            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                    if (bcryptErr) {
                        console.error(bcryptErr);
                        res.status(500).send('Fehler bei der Passwortüberprüfung');
                    } else {
                        if (bcryptResult) {
                            // Benutzer erfolgreich eingeloggt, Session erstellen
                            req.session.user = {
                                id: user.id,
                                username: user.username,
                                role: user.role // Hier speicherst du die Benutzerrolle
                                };
                            app.locals.user = req.session.user;
                            console.log(req.session.user); // Hier ist der richtige Ort, um die Session auszugeben
                            res.redirect('/report');
                        } else {
                            res.status(401).send('Falsches Passwort');
                        }
                    }
                });
            } else {
                res.status(404).send('Benutzer nicht gefunden');
            }
            connection.release();
            }
        });
    });
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                res.status(500).send('Fehler bei der Passwortverschlüsselung');
            } else {
                connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Fehler bei der Registrierung');
                    } else {
                        res.redirect('/login?success=true');
                    }
                });
            }
        });

    connection.release();
            
        });
});

app.get('/report', (req, res) => {
    // Prüfen, ob der Benutzer eingeloggt ist
    if (req.session.user) {
        res.render('report', { locale: req.cookies.locale, translations: i18n.__mf });
    } else {
        res.redirect('/login');
    }
});

app.post('/report', upload.single('screenshots'), (req, res) => {
    const modul = req.body.modul;
    const differentClass = req.body.class;
    const category = req.body.category;
    const resource = req.body.resource; 
    const minute = req.body.minute; 
    const site = req.body.seite; 
    const comment = req.body.comment; 
    const screenshots = req.file; // Alle hochgeladenen Bilder


    // Das heutige Datum abrufen (YYYY-MM-DD)
    const heute = new Date().toISOString().slice(0, 10);

    // Wenn kein Bearbeiter angegeben ist, wird der Status auf "neu" gesetzt
    const status = 'Neu';

    // Ermittle die Melder-ID aus der Session des eingeloggten Benutzers
    const notifier_id = req.session.user.id;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        // Hier fügen Sie die Fehlermeldung in "reports" ein
        connection.query('INSERT INTO reports (modul, class, category, status, date, assignee_id, notifier_id, resource, minute, site, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [modul, differentClass, category, status, heute, null, notifier_id, resource, minute, site, comment], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Fehler beim Speichern der Fehlermeldung');
            } else {
                // Die ID der gerade eingefügten Fehlermeldung abrufen
                const reportId = result.insertId;

                // Hier müssen Sie eine Schleife verwenden, um alle hochgeladenen Bilder zu verarbeiten
                
                if (req.file) {
                    const screenshots = req.file; // Alle hochgeladenen Bilder
                    //const screenshotData = screenshots.buffer; // Die Binärdaten des Screenshots
                    const screenshotFileName = screenshots.filename; // Der Dateiname des Screenshots
                    //console.log(screenshotData);

                    // Fügen Sie die Screenshots in die Tabelle "screenshots" ein und verknüpfen Sie sie mit der Fehlermeldung
                    connection.query('INSERT INTO screenshots (report_id, screenshot_filename) VALUES (?, ?)', [reportId, screenshotFileName], (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Fehler beim Speichern des Screenshots');
                        } else {
                            res.redirect('/report?success');
                        }
                    });
                } else {
                    // Keine Datei wurde hochgeladen, Sie können hier eine Meldung oder Umleitung hinzufügen
                    res.redirect('/report?success');
                }
                

                //res.redirect('/report?success');
            }
        });
        connection.release();
    
    });   
});


app.get('/overview', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        // Hier kannst du die Fehlerdaten aus der Datenbank abrufen (anpassen)
        connection.query('SELECT * FROM reports WHERE notifier_id = ?', [req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Fehler beim Abrufen der reports');
            } else {
                // Rendere die overview.html-Seite und übergebe die Fehlerdaten an die Vorlage
                res.render('overview', { reports: results });
            }
        });
    connection.release();
        
    });
});

app.get('/bearbeiterMeineFehler', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        // Überprüfe, ob der Benutzer angemeldet ist und die Rolle "Bearbeiter" hat
        if (req.session.user && req.session.user.role === 'bearbeiter') {
            // Hier kannst du den Inhalt der Bearbeiterseite anzeigen
                // Hier kannst du die Fehlerdaten aus der Datenbank abrufen (anpassen)
            connection.query('SELECT * FROM reports WHERE assignee_id = ?', [req.session.user.id], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Fehler beim Abrufen der zugewiesenen reports');
                } else {
                    // Rendere die bearbeiterMeineFehler.ejs-Seite und übergebe die Fehlerdaten an die Vorlage
                    res.render('bearbeiterMeineFehler', { reports: results });
                }
            });
        } else {
            // Benutzer hat keine Berechtigung, zur Startseite oder einer Fehlerseite umleiten
            res.redirect('/report');
        }
        connection.release();
        
    });

});

app.get('/alleFehler', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

            // Überprüfe, ob der Benutzer angemeldet ist und die Rolle "Bearbeiter" hat
            if (req.session.user && req.session.user.role === 'bearbeiter') {
                // Hier kannst du den Inhalt der Bearbeiterseite anzeigen
                connection.query('SELECT * FROM reports ORDER BY date DESC, status ASC', (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Fehler beim Abrufen aller reports');
                    } else {
                        // Rendere die alleFehler.ejs-Seite und übergebe die Fehlerdaten an die Vorlage
                        res.render('alleFehler', { reports: results });
                    }
                });
            } else {
                // Daten aus der Datenbank abrufen

                // Benutzer hat keine Berechtigung, zur Startseite oder einer Fehlerseite umleiten
                res.redirect('/report');
            }
        connection.release();
        
    });

});

app.get('/bearbeiten/:id', (req, res) => {
    const fehlerId = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        // Hier holst du die Daten für den ausgewählten Fehler (fehlerId) aus deiner Datenbank
        connection.query('SELECT * FROM reports WHERE id = ?', [fehlerId], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Fehler beim Abrufen des Fehlers');
            } else {
                if (results.length > 0) {
                    const fehler = results[0];

                    // Hier holst du die Liste der Benutzer mit der Rolle "Bearbeiter" aus deiner Datenbank
                    connection.query('SELECT * FROM users WHERE role = "bearbeiter"', (err, bearbeiter) => {                 
                        if (err) {
                            console.error(err);
                            res.status(500).send('Fehler beim Abrufen der Bearbeiter');
                        } else {
                            // Hier holst du die Benutzer-ID des notifier_id-Benutzers aus deiner Datenbank
                            const notifierId = fehler.notifier_id;
                            connection.query('SELECT username FROM users WHERE id = ?', [notifierId], (err, usernameResult) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Fehler beim Abrufen der Benutzer-E-Mail-Adresse');
                                } else {
                                    const notifierUsername = usernameResult[0].username;

                                    // Hier holst du die Screenshots für den Fehlerbericht aus der Datenbank
                                    connection.query('SELECT * FROM screenshots WHERE report_id = ?', [fehler.id], (err, screenshotResults) => {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).send('Fehler beim Abrufen der Screenshots');
                                        } else {
                                            // Verarbeite die Screenshots, indem du sicherstellst, dass screenshotResult.screenshot_data nicht null ist
                                            const screenshots = screenshotResults.map((screenshotResult) => screenshotResult.screenshot_filename);
                                            // Rendere die "bearbeiten.ejs"-Seite und übergebe die Daten an die Vorlage
                                            console.log(screenshots);
                                            res.render('bearbeiten', { fehler, bearbeiter, notifierUsername, screenshots });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).send('Fehler nicht gefunden');
                }
            }
        });
    connection.release();
        
    });
});

app.get('/bearbeiten-melder/:id', (req, res) => {
    const fehlerId = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        // Hier holst du die Daten für den ausgewählten Fehler (fehlerId) aus deiner Datenbank
        //connection.query('SELECT * FROM reports WHERE id = ?', [fehlerId], (err, results) => {
        connection.query('SELECT reports.*, users.username AS assignee_name FROM reports LEFT JOIN users ON reports.assignee_id = users.id WHERE reports.id = ?', [fehlerId], (err, results) => {
            
            if (err) {
                console.error(err);
                res.status(500).send('Fehler beim Abrufen des Fehlers');
            } else {
                if (results.length > 0) {
                    const fehler = results[0];

                    // Hier holst du die Screenshots für den Fehlerbericht aus der Datenbank
                    connection.query('SELECT * FROM screenshots WHERE report_id = ?', [fehler.id], (err, screenshotResults) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Fehler beim Abrufen der Screenshots');
                        } else {
                            // Verarbeite die Screenshots, indem du sicherstellst, dass screenshotResult.screenshot_data nicht null ist
                            const screenshots = screenshotResults.map((screenshotResult) => {
                                //if (screenshotResult.screenshot_data) {
                                if (screenshotResult.screenshot_filename) {
                                    return {
                                        //base64Screenshot: screenshotResult.screenshot_data.toString('base64'),
                                        filename: screenshotResult.screenshot_filename
                                    };
                                }
                                return null; // Wenn screenshot_data null ist, überspringe diesen Screenshot
                            }).filter((screenshot) => screenshot !== null);

                            // Rendere die "bearbeiten.ejs"-Seite und übergebe die Daten an die Vorlage
                            res.render('bearbeiten-melder', { fehler, screenshots });
                        }
                    });
                } else {
                    res.status(404).send('Fehler nicht gefunden');
                }
            }
        });
        connection.release();
    
    });
});




app.post('/speichernBearbeitung/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const prio = req.body.prio;
    const assignee_id = req.body.assignee_id;
    const message = req.body.message;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        connection.query('UPDATE reports SET status = ?, prio = ?, assignee_id = ?, message = ? WHERE id = ?', [status, prio, assignee_id, message, id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Fehler beim Speichern der Änderungen');
            } else {
                // Nach dem Speichern der Änderungen zurückspringen zur alleFehler-Ansicht oder einer anderen Seite
                res.redirect('/alleFehler');
            }
        });
    connection.release();
        
    });
});

app.post('/speichernBearbeitung-melder/:id', (req, res) => {
    const id = req.params.id;
    const modul = req.body.modul;
    const category = req.body.category;
    const resource = req.body.resource;
    const minute = req.body.minute;
    const seite = req.body.seite;
    const comment = req.body.comment;
    const status = "in bearbeitung";

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Fehler beim Abrufen der Verbindung aus dem Pool:', err);
            res.status(500).send('Fehler bei der Anmeldung');
            return;
        }

        connection.query(
            'UPDATE reports SET modul = ?, category = ?, resource = ?, minute = ?, site = ?, comment = ?, status = ? WHERE id = ?',
            [modul, category, resource, minute, seite, comment, status, id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Fehler beim Speichern der Änderungen');
                } else {
                    // Nach dem Speichern der Änderungen zurückspringen zur alleFehler-Ansicht oder einer anderen Seite
                    res.redirect('/overview');
                }
            }
        );
        connection.release();
    
    });
});

app.get('/setLanguage/:language', (req, res) => {
    const language = req.params.language;

    // Setze das "locale"-Cookie mit der ausgewählten Sprache
    res.cookie('locale', language);

    // Hier kannst du die aktuelle Sprache (Locale) abrufen
    //const currentLocale = i18n.getLocale(req);
    i18n.setLocale(req, language);
       // Speichere die ausgewählte Sprache in der Sitzung
    req.session.locale = language;

    // Weiterleitung zur Startseite oder einer anderen Seite
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
