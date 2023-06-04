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
-- Table structure for table `employee_table`
--

DROP TABLE IF EXISTS `employee_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `DNI` varchar(45) NOT NULL,
  `Phone` int NOT NULL,
  `Password` blob NOT NULL,
  `Role` varchar(45) NOT NULL,
  `Employee_Id` int NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Password_Try` blob NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `Employee_Id_UNIQUE` (`Employee_Id`),
  UNIQUE KEY `DNI/NIE_UNIQUE` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'Juan Fuentes de la Torre','juan@gmail.com','12345679A',915648297,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','repartidor',15,1,''),(2,'Pedro Perez','pedro@gmail.com','56359990L',644359884,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','repartidor',16,1,''),(3,'MarÃ­a LÃ³pez','m.lopez@gmail.com','78858688K',647496954,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','repartidor',17,1,''),(4,'David Benito','david@gmail.com','08976584J',633578874,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','atenciÃ³n al cliente',23,1,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ'),(5,'MarÃ­a Izquierdo','maria@gmail.com','44663598R',655399856,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','atenciÃ³n al cliente',24,0,''),(6,'Celia FernÃ¡ndez','celia.f@gmail.com','03565589S',644365578,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','atenciÃ³n al cliente',25,1,''),(7,'Juan Carlos','juan.c@gmail.com','32565547F',655123486,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','manager',35,0,''),(8,'Ana GarcÃ­a','ana.g@gmail.com','02547866B',663562894,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','manager',36,1,''),(9,'Ana Derecho','ana.der@gmail.com','54263544D',64459794,_binary '$¨\ã\ÎÓ”qX§˜w=V\êqQ','atenciÃ³n al cliente',26,0,'');
/*!40000 ALTER TABLE `employee_table` ENABLE KEYS */;
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
