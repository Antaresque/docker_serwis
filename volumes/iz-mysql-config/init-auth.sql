SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` text NOT NULL,
    `role` varchar(30) NOT NULL DEFAULT 'user',
    `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
    `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'janusz', '$2b$10$unmFncVZsYSF7ADdedyfEe0BarzkNnDUOyXZGlX27t.I9JN7muau6', 'user', '2021-05-05 20:18:12', '2021-05-05 20:18:12'),
(2, 'seba2137', '$2b$10$hY5g5ZjETnpZwLC0Eovfwe53MPcv/DOjmi3MyFX8Uw.NL9aa5l/P2', 'user', '2021-05-08 11:19:39', '2021-05-08 11:19:39'),
(3, 'pawel69', '$2b$10$5bwNiLDjN4nD/lITaMch5.X8at.BV0hFW0uh/o682Ry7mkcdOo6ou', 'user', '2021-05-03 10:14:38', '2021-05-03 10:14:38'),
(4, 'antro', '$2b$10$2.E2/4qHLIugFKpZbLcS4egqs5rJG30iTwH6/yHzfvguu5E5kFyAe', 'admin','2021-05-01 21:37:00', '2021-05-01 21:37:00'),
(5, 'ralmajster', '$2b$10$Nds.sbh59NYeRSE5xi0MFu40JPUQ5U/FY/scpR8bYRCqGPBpW4fzG', 'admin', '2021-05-01 21:37:00', '2021-05-01 21:37:00');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

COMMIT;

