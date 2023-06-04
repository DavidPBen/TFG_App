-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_tfg
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `package_table`
--

DROP TABLE IF EXISTS `package_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Order_Id` int NOT NULL,
  `Weight` float NOT NULL,
  `Width` float NOT NULL,
  `Height` float NOT NULL,
  `Length` float NOT NULL,
  `Volume` float NOT NULL,
  `Fragility` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `Order_Id_idx` (`Order_Id`),
  CONSTRAINT `Order_Id` FOREIGN KEY (`Order_Id`) REFERENCES `order_table` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_table`
--

LOCK TABLES `package_table` WRITE;
/*!40000 ALTER TABLE `package_table` DISABLE KEYS */;
INSERT INTO `package_table` VALUES (1,1,7.89,52,35,26,47320,0),(2,2,27.85,63,52,51,167076,1),(3,3,24.38,50,45,65,146250,0),(4,3,2.71,25,26,25,16250,0),(5,3,0.39,12,15,13,2340,1),(6,4,6.2,62,25,24,37200,1),(7,4,0.77,24,12,16,4608,1),(8,5,0.06,10,7,5,350,0),(9,6,4.67,25,32,35,28000,0),(10,7,1.4,14,24,25,8400,1),(11,7,5.46,35,36,26,32760,0),(12,8,2.02,22,22,25,12100,0);
/*!40000 ALTER TABLE `package_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 20:18:35
