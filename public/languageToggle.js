// languageToggle.js

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}`;
    document.cookie = cookieValue;
}

$(document).ready(function() {


});

document.getElementById("language-toggle").addEventListener("click", function () {
    // Hier kannst du die Sprache umschalten
    const userLocale = getCookie('locale');
    let newLocale;
    var table = $('#errorTable').DataTable( {
        "language": {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/de-DE.json'
        }
    });
    table


    table.destroy();

    if (userLocale === 'de') {
        newLocale = 'en';
        table = $('#errorTable').DataTable( {
            "language": {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/de-DE.json'
            }
        });
        table
    } else {
        newLocale = 'de';
        table = $('#errorTable').DataTable( {
            "language": {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/de-DE.json'
            }
        });
        table
    }

    // Konsolenausgabe für Debugging
    console.log('User Locale:', userLocale);

    // Sende ein AJAX-Anfrage, um die Spracheinstellung auf dem Server zu ändern
    $.ajax({
        type: 'GET',
        url: '/setLanguage/' + newLocale,
        success: function (response) {
            // Die AJAX-Anfrage war erfolgreich, ändere die Anzeige gemäß der ausgewählten Sprache
            location.reload();
        }
    });
});