-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 11. 10:31
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tabletek`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablet`
--

CREATE TABLE `tablet` (
  `Id` int(11) NOT NULL,
  `Brand` text NOT NULL,
  `Model` text NOT NULL,
  `Price` int(11) NOT NULL,
  `RAM` int(11) NOT NULL,
  `Memory` int(11) NOT NULL,
  `Weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablet`
--

INSERT INTO `tablet` (`Id`, `Brand`, `Model`, `Price`, `RAM`, `Memory`, `Weight`) VALUES
(1, 'Apple', 'iPhone 14', 399999, 16, 128, 245),
(2, 'Samsung', 'Galaxy S23', 359999, 16, 128, 245),
(3, 'Apple', 'iPad 10.9 2022', 159900, 4, 64, 477),
(4, 'Xiaomi', 'Redmi Pad Pro', 89000, 6, 128, 571),
(5, 'Xiaomi', 'Redmi Pad Pro', 89000, 6, 128, 571),
(6, 'Xiaomi', 'Redmi Pad Pro', 89000, 6, 128, 571);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablet`
--
ALTER TABLE `tablet`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablet`
--
ALTER TABLE `tablet`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
