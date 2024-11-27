-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2024 at 11:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieID` int(11) NOT NULL,
  `movieName` varchar(255) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `rating` varchar(50) DEFAULT NULL,
  `yearMade` varchar(50) DEFAULT NULL,
  `imageName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieID`, `movieName`, `genre`, `rating`, `yearMade`, `imageName`) VALUES
(47, 'The Shawshank Redemption', 'Drama', '9.5', '1994', 'shawshank.jpg'),
(48, 'The Dark Knight', 'Action', '9.0', '2008', 'dark_knight.jpg'),
(49, 'Forrest Gump', 'Drama', '8.3', '1994', 'forrest_gump.jpg'),
(50, 'Inception', 'Sci-Fi', '8.8', '2010', 'inception.jpg'),
(51, 'The Godfather', 'Crime', '9.2', '1972', 'godfather.png'),
(52, 'The Matrix', 'Sci-Fi', '8.7', '1999', 'matrix.jpg'),
(53, 'Pulp Fiction', 'Crime', '8.9', '1994', 'pulp_fiction.jpg'),
(54, 'Gladiator', 'Drama', '8.5', '2000', 'gladiator.jpg'),
(55, 'The Silence of the Lambs', 'Thriller', '8.6', '1991', 'silence_of_the_lambs.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
