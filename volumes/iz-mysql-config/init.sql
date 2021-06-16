-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Maj 2021, 20:44
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

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_polish_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`id`, `userid`, `imgid`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 4, 2, 'komentarz 1', '2021-05-25 18:28:33', '2021-05-25 18:28:33'),
(2, 2, 1, 'komentarz 2', '2021-05-25 18:28:33', '2021-05-25 18:28:33'),
(3, 5, 2, 'komentarz 3', '2021-05-25 18:28:33', '2021-05-25 18:28:33'),
(4, 5, 3, 'komentarz 4', '2021-05-25 18:28:33', '2021-05-25 18:28:33');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `address` text COLLATE utf8mb4_polish_ci NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `images`
--

INSERT INTO `images` (`id`, `userid`, `address`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, '1.jpg', 'test', 'test', '2021-05-05 20:18:40', '2021-05-05 20:18:40'),
(2, 1, '2.jpg', 'nazwa', 'dpgjdsopgjsdpogjdsopgjsopg', '2021-05-05 20:19:02', '2021-05-05 20:19:02'),
(3, 2, 'kosciol.png', 'katedra', '2137', '2021-05-09 00:00:00', '2021-05-09 00:00:00'),
(4, 5, 'reimu.png', 'reimu na rzulfiu', 'zajelo 7h co sadzicie', '2021-05-02 21:37:00', '2021-05-02 21:37:00'),
(5, 5, 'lampa.png', 'ladny zyrandol', 'oto lampa z tieru B mojej top tier listy lamp z umineko', '2021-05-02 21:37:00', '2021-05-02 21:37:00'),
(6, 4, 'beatoreechee.png', 'co tam batora', 'znowu nawiedzmowane', '2021-05-02 21:37:00', '2021-05-02 21:37:00'),
(7, 4, 'rika.png', 'furude rika', 'cute', '2021-05-02 21:37:00', '2021-05-02 21:37:00');

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `images_vc`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `images_vc` (
`id` int(11)
,`userid` int(11)
,`address` text
,`title` varchar(50)
,`description` text
,`createdAt` timestamp
,`updatedAt` timestamp
,`votes` bigint(21)
,`comments` bigint(21)
);

CREATE TABLE `users_vc` (
`id` int(11)
,`nickname` varchar(50)
,`email` varchar(50)
,`avatar` text
,`createdAt` timestamp
,`updatedAt` timestamp
,`images` bigint(21)
,`comments` bigint(21)
);

CREATE TABLE `comments_vc` (
  `id` int(11),
  `imgid` int(11),
  `userid` int(11),
  `comment` text,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  `votes` bigint(21)
);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_polish_ci,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `nickname`, `email`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'janusz', 'janusz@test.pl', 'avatar1.jpg', '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(2, 'seba2137', 'sebastian@seba.com', 'avatar2.jpg', '2021-05-08 11:19:39', '2021-05-08 11:19:39'),
(3, 'pawel69', 'papaj@interia.pl', 'avatar3.jpg', '2021-05-03 10:14:38', '2021-05-03 10:14:38'),
(4, 'antro', 'antaresque@gmail.com', 'avatar4.jpg', '2021-05-01 21:37:00', '2021-05-01 21:37:00'),
(5, 'ralmajster', 'dante.rydzyk@gmail.com', 'avatar5.jpg', '2021-05-01 21:37:00', '2021-05-01 21:37:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `votes`
--

INSERT INTO `votes` (`id`, `imgid`, `userid`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(2, 2, 4, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(3, 5, 2, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(4, 5, 1, '2021-05-05 20:18:12', '2021-05-05 20:18:12');

-- --------------------------------------------------------

CREATE TABLE `votes_comments` (
  `id` int(11) NOT NULL,
  `commentid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

INSERT INTO `votes_comments` (`id`, `commentid`, `userid`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(2, 2, 4, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(3, 3, 2, '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(4, 3, 1, '2021-05-05 20:18:12', '2021-05-05 20:18:12');

--
-- Struktura widoku `images_vc`
--
DROP TABLE IF EXISTS `images_vc`;

CREATE VIEW images_vc AS
	SELECT images.*, IFNULL(a.votes, 0) AS votes, IFNULL(b.comments, 0) AS comments
	FROM images
    LEFT JOIN (SELECT imgid, COUNT(*) as votes FROM votes GROUP BY imgid) a ON(images.id = a.imgid)
    LEFT JOIN (SELECT imgid, COUNT(*) as comments FROM comments GROUP BY imgid) b ON(images.id = b.imgid);

DROP TABLE IF EXISTS `users_vc`;

CREATE VIEW users_vc AS
	SELECT users.*, IFNULL(a.images, 0) AS images, IFNULL(b.comments, 0) AS comments
	FROM users
    LEFT JOIN (SELECT userid, COUNT(*) as images FROM images GROUP BY userid) a ON(users.id = a.userid)
    LEFT JOIN (SELECT userid, COUNT(*) as comments FROM comments GROUP BY userid) b ON(users.id = b.userid);

DROP TABLE IF EXISTS `comments_vc`;

CREATE VIEW comments_vc AS
	SELECT comments.*, IFNULL(a.votes, 0) AS votes
	FROM comments
    LEFT JOIN (SELECT commentid, COUNT(*) as votes FROM votes_comments GROUP BY commentid) a ON(comments.id = a.commentid);

--

-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `imgid` (`imgid`);

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
-- Indeksy dla tabeli `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imgid` (`imgid`),
  ADD KEY `userid` (`userid`);

ALTER TABLE `votes_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentid` (`commentid`),
  ADD KEY `userid` (`userid`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
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

ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `votes_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`imgid`) REFERENCES `images` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`imgid`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `votes_comments`
  ADD CONSTRAINT `votes_comments_ibfk_1` FOREIGN KEY (`commentid`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_comments_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;
