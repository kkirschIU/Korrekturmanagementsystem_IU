-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Okt 2023 um 09:47
-- Server-Version: 10.1.38-MariaDB
-- PHP-Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `report`
--
CREATE DATABASE IF NOT EXISTS `report` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `report`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `modul` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` enum('inhaltlich','sprachlich','technisch') COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `assignee_id` int(11) DEFAULT NULL,
  `notifier_id` int(11) NOT NULL,
  `resource` enum('Skript','Interactive Skript','Musterklausur','Online Test','Präsentation','Vodcast','Podcast','Library Service') COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('Neu','in bearbeitung','Abgeschlossen','unklar') COLLATE utf8_unicode_ci NOT NULL,
  `prio` enum('unkritisch','kritisch') COLLATE utf8_unicode_ci DEFAULT 'unkritisch',
  `comment` text COLLATE utf8_unicode_ci,
  `message` text COLLATE utf8_unicode_ci,
  `minute` text COLLATE utf8_unicode_ci,
  `site` text COLLATE utf8_unicode_ci,
  `class` enum('Fehler','Verbesserung','Erweiterung') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `reports`
--

INSERT INTO `reports` (`id`, `modul`, `category`, `date`, `assignee_id`, `notifier_id`, `resource`, `status`, `prio`, `comment`, `message`, `minute`, `site`, `class`) VALUES
(25, 'ISEF01', 'inhaltlich', '2023-09-20', 3, 2, '', 'unklar', 'kritisch', 'Rechtschreibfehler \"nue\" statt \"neu\"', '', '9999', '', 'Fehler'),
(26, 'ISEF01', 'technisch', '2023-09-20', 3, 2, '', 'in bearbeitung', 'unkritisch', 'Bild wird nur noch schwarz angeziegt', '', '10', '', 'Fehler'),
(31, 'ISEF01', 'sprachlich', '2023-09-20', NULL, 2, '', 'Neu', 'unkritisch', 'Falsch geschrieben Technish statt Technisch', NULL, '', '1', 'Fehler'),
(33, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Bild', NULL, '', '1', 'Fehler'),
(34, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Bild', NULL, '', '1', 'Fehler'),
(35, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Bild', NULL, '', '1', 'Fehler'),
(36, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Bild ', NULL, '', '1', 'Fehler'),
(37, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Bild', NULL, '', '1', 'Fehler'),
(38, 'ISEF01', 'inhaltlich', '2023-09-22', NULL, 2, '', 'Neu', 'unkritisch', 'Test', NULL, '1', '', 'Fehler'),
(39, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', 'Bild', NULL, '', '1', 'Fehler'),
(40, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', 'Bild 2', NULL, '', '1', 'Fehler'),
(41, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', 'Bild 99', NULL, '', '1', 'Fehler'),
(42, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', 'BBB', NULL, '', '1', 'Fehler'),
(43, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(44, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(45, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', 'biiiiiilld', NULL, '', '1', 'Fehler'),
(46, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(47, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(48, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(49, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(50, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(51, 'ISEF01', 'inhaltlich', '2023-10-09', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(52, 'ISEF01', 'inhaltlich', '2023-10-09', 3, 3, '', 'in bearbeitung', 'unkritisch', 'Test 123', '', '', '', 'Fehler'),
(53, 'ISEF01', 'inhaltlich', '2023-10-10', NULL, 3, '', 'Neu', 'unkritisch', 'Test', NULL, '', '1', 'Fehler'),
(54, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', 'Test', NULL, '', '1', 'Fehler'),
(55, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', '11', NULL, '', '1', 'Fehler'),
(56, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', 'test', NULL, '', '1', 'Fehler'),
(57, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(58, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(59, 'ISEF01', 'inhaltlich', '2023-10-13', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(60, 'ISEF01', 'inhaltlich', '2023-10-16', NULL, 3, '', 'Neu', 'unkritisch', 'dfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigidfsfdgkfdgh fdigi', NULL, '', '1', 'Fehler'),
(61, 'ISEF01', 'inhaltlich', '2023-10-16', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(62, 'ISEF01', 'inhaltlich', '2023-10-16', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(63, 'ISEF01', 'inhaltlich', '2023-10-16', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', 'Fehler'),
(64, 'ISEF01', 'inhaltlich', '2023-10-17', NULL, 3, '', 'Neu', 'unkritisch', 'Test', NULL, '', '1', ''),
(65, 'ISEF01', 'inhaltlich', '2023-10-17', 3, 3, '', 'unklar', 'unkritisch', 'Test', '', '', '1', ''),
(66, 'ISEF01', 'inhaltlich', '2023-10-20', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', ''),
(67, 'ISEF01', 'inhaltlich', '2023-10-20', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', ''),
(68, 'ISEF01', 'inhaltlich', '2023-10-20', NULL, 3, '', 'Neu', 'unkritisch', 'Test', NULL, '', '1', ''),
(69, 'ISEF01', 'inhaltlich', '2023-10-20', NULL, 3, '', 'Neu', 'unkritisch', '1', NULL, '', '1', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `screenshots`
--

CREATE TABLE `screenshots` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `screenshot_filename` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `screenshots`
--

INSERT INTO `screenshots` (`id`, `report_id`, `screenshot_filename`) VALUES
(1, 33, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(2, 34, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(3, 35, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(4, 36, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(5, 37, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(6, 39, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(7, 40, '2023-09-14 19_43_23-Datei hochladen.jpg'),
(8, 51, 'screenshots-1696864314388.jpg'),
(9, 52, 'screenshots-1696864611322.jpg'),
(10, 55, 'screenshots-1697189795188.jpg'),
(11, 60, 'screenshots-1697455294901.jpg'),
(12, 61, 'screenshots-1697455478877.jpg'),
(13, 62, 'screenshots-1697455573070.jpg'),
(14, 63, 'screenshots-1697455705059.jpg'),
(15, 68, 'screenshots-1697784077823.jpg'),
(16, 69, 'screenshots-1697784129214.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` enum('normal','bearbeiter') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(2, 'demo@iubh-fernstudium.de', '$2b$10$vNNJyv0Ym3kgQ7AbZW8rHeycTSXP5KI7csUKfaP.U17kx3n6aGBnS', 'normal'),
(3, 'bearbeiter1@iubh-fernstudium.de', '$2b$10$k2Vi5z4np/FJCoivTbkZqO9s5EAQWonxfGfRlhFj92IOGdCAGXCJK', 'bearbeiter');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bearbeiter_id` (`assignee_id`),
  ADD KEY `gemeldet_von_id` (`notifier_id`);

--
-- Indizes für die Tabelle `screenshots`
--
ALTER TABLE `screenshots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT für Tabelle `screenshots`
--
ALTER TABLE `screenshots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`notifier_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `screenshots`
--
ALTER TABLE `screenshots`
  ADD CONSTRAINT `screenshots_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
