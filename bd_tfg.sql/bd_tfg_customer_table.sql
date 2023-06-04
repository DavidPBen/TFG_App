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
-- Table structure for table `customer_table`
--

DROP TABLE IF EXISTS `customer_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(70) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Customer_Id` varchar(45) NOT NULL,
  `Phone` int NOT NULL,
  `Address` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `Password` blob NOT NULL,
  `Password_Try` blob NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `DNI/NIF_UNIQUE` (`Customer_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_table`
--

LOCK TABLES `customer_table` WRITE;
/*!40000 ALTER TABLE `customer_table` DISABLE KEYS */;
INSERT INTO `customer_table` VALUES (1,'Emilio Jimenez PÃ©rez','emilio@gmail.com','06213345M',655987367,'Calle San Basilio, 14, 3ÂºB, 28024',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ'),(3,'Juan Alfonso GÃ³mez','juanalfo@gmail.com','02346822L',666897625,'Calle Hierro, 65, 2ÂºA, 32087',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',''),(5,'Adriana GarcÃ­a SÃ¡nchez','adriana@gmail.com','78569441B',678965201,'Calle Fauna, 12, 1ÂºA, 28022',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',''),(6,'NTTDATA','ntt_data@nttdata.everys.com','B82387770',917490000,'Calle Fuente de la Mora, 1, 28050',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',''),(7,'BBVA','info@bbva.com','A48265169',917456984,'Calle de San NicolÃ¡s, 4, 28005',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',''),(8,'Banco Santander','banco@santander.com','B82374067',917516898,'Calle Fuente de la Mora, 7, 28050',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ',''),(9,'Alfonso GarcÃ­a Benito','alfonso.ga@gmail.com','15235415F',615414442,'Calle de Hierro, 1, 12011',_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','');
/*!40000 ALTER TABLE `customer_table` ENABLE KEYS */;
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
