-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Maj 2021, 21:47
-- Wersja serwera: 10.4.18-MariaDB
-- Wersja PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Baza danych: `iz_data`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_polish_ci NOT NULL,
  `date` date NOT NULL,
  `upvotes` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  `crdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`id`, `userid`, `comment`, `date`, `upvotes`, `imgid`, `crdate`) VALUES
(1, 4, 'komentarz 1', '2021-05-02', 2137, 69, '2021-05-02 21:37:37'),
(2, 2, 'komentarz 2', '2021-05-03', 69, 420, '2021-05-03 00:00:00'),
(3, 5, 'komentarz 3', '2021-05-10', 2137, 1, '2021-05-10 00:00:00'),
(4, 5, 'komentarz 4', '2021-05-05', 69, 3, '2021-05-05 21:37:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `address` text COLLATE utf8mb4_polish_ci NOT NULL,
  `upvotes` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `crdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `images`
--

INSERT INTO `images` (`id`, `userid`, `address`, `upvotes`, `comments`, `title`, `description`, `crdate`) VALUES
(1, 1, '1.jpg', 20, 2, 'test', 'test', '2021-05-05 20:18:40'),
(2, 1, '2.jpg', 30, 3, 'nazwa', 'dpgjdsopgjsdpogjdsopgjsopg', '2021-05-05 20:19:02'),
(3, 2, 'kosciol.png', 69, 1, 'katedra', '2137', '2021-05-09 00:00:00'),
(4, 5, 'reimu.png', 21, 37, 'reimu na rzulfiu', 'zajelo 7h co sadzicie', '2021-05-02 21:37:00'),
(5, 5, 'lampa.png', 69, 420, 'ladny zyrandol', 'oto lampa z tieru B mojej top tier listy lamp z umineko', '2021-05-02 21:37:00'),
(6, 4, 'beatoreechee.png', 11037, 21, 'co tam batora', 'znowu nawiedzmowane', '2021-05-02 21:37:00'),
(7, 4, 'rika.png', 10000, 22, 'furude rika', 'cute', '2021-05-02 21:37:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `crdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `nickname`, `email`, `crdate`) VALUES
(1, 'janusz', 'janusz@test.pl', '2021-05-05 20:18:12'),
(2, 'seba2137', 'sebastian@seba.com', '2021-05-08 11:19:39'),
(3, 'pawel69', 'papaj@interia.pl', '2021-05-03 10:14:38'),
(4, 'antro', 'antaresque@gmail.com', '2021-05-01 21:37:00'),
(5, 'ralmajster', 'dante.rydzyk@gmail.com', '2021-05-01 21:37:00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `imgid` (`imgid`),
  ADD KEY `imgid_2` (`imgid`);

--
-- Indeksy dla tabeli `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`imgid`) REFERENCES `images` (`id`);

--
-- Ograniczenia dla tabeli `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

