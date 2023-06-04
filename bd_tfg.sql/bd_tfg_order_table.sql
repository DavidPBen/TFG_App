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
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Customer_Id` int NOT NULL,
  `Origin` varchar(100) NOT NULL,
  `Destination` varchar(100) NOT NULL,
  `Additional_Destination` varchar(100) DEFAULT NULL,
  `Volume` float NOT NULL,
  `Cost` float NOT NULL,
  `State` varchar(45) NOT NULL,
  `Shipment_Type` varchar(45) NOT NULL,
  `Collection_Date` datetime DEFAULT NULL,
  `Expected_Collection_Date` datetime NOT NULL,
  `Arrival_Date` datetime DEFAULT NULL,
  `Expected_Arrival_Date` datetime NOT NULL,
  `Return_Date` datetime DEFAULT NULL,
  `Expected_Return_Date` datetime DEFAULT NULL,
  `Commentary` varchar(200) DEFAULT NULL,
  `Employee_In_Charge` int NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Expedition_Number` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Expedition_Number_UNIQUE` (`Expedition_Number`),
  KEY `Customer_Id_idx` (`Customer_Id`),
  KEY `Employee_In_Charge_idx` (`Employee_In_Charge`),
  CONSTRAINT `Customer_Id` FOREIGN KEY (`Customer_Id`) REFERENCES `customer_table` (`Id`),
  CONSTRAINT `Employee_In_Charge` FOREIGN KEY (`Employee_In_Charge`) REFERENCES `employee_table` (`Employee_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES (1,1,'Calle San Basilio, 14, 3ºB, 25024','Calle de la Luna, 1, 28001',NULL,47320,21.4,'En almacén origen','Normal','2020-12-12 12:10:00','2020-12-12 10:30:00',NULL,'2020-12-26 17:10:00',NULL,NULL,NULL,17,1,120121425),(2,3,'Calle Hierro, 65, 2ºA, 32087','Calle Montero, 47, 1ºB, 12076','Calle Formentosa, 6, 1ºA, 56076',167076,45.65,'En camino','Rápido','2023-01-08 11:40:00','2023-01-08 12:00:00',NULL,'2023-01-10 12:40:00',NULL,NULL,'Necesito que llegue lo antes posible, es urgente.',15,1,320124541),(3,5,'Calle Olvido, 33, 24078','Calle Mariposa, 67, 28025',NULL,164840,41.3,'Entregado','Normal','2022-12-25 16:45:00','2022-12-25 15:25:00','2022-12-28 10:00:00','2022-01-02 10:30:00',NULL,NULL,'Si no estoy llamen al 912524654',16,0,102563214),(4,6,'Calle Fuente de la Mora, 1, 28050','Calle Estocolmo, 27, 28045',NULL,41808,21.4,'En trámite','Normal',NULL,'2022-12-21 10:50:00',NULL,'2022-12-27 09:50:00',NULL,NULL,NULL,15,1,785478563),(5,7,'Calle de San Nicolás, 4, 48005','Calle Fresno, 61, 28036',NULL,350,14.3,'Entregado','Rápido','2022-11-17 18:22:00','2022-11-17 18:30:00','2022-11-19 20:17:00','2022-11-19 18:45:00',NULL,NULL,'Pedido importante. Confiamos en vosotros',16,0,856325412),(6,8,'Calle Fuente de la Mora, 7, 28050','Calle Lluvia, 11, 36056','Calle Lluvia, 17, 67056',28000,15.95,'En trámite','Normal',NULL,'2022-12-27 17:10:00',NULL,'2023-01-03 12:30:00',NULL,NULL,NULL,16,1,956841235),(7,1,'Calle San Basilio, 14, 3ºB, 25024','Calle de la Pesca, 1, 32024',NULL,41160,28.49,'En devolución - En trámite','Normal','2022-12-23 10:00:00','2022-12-23 09:45:00',NULL,'2023-01-05 16:30:00',NULL,'2023-01-12 12:45:00','Segundo pedido. Disculpen las molestias.',17,1,325698746),(8,6,'Calle Fuente de la Mora, 1, 28050','Calle Tomelloso, 32, 3ºB, 28026',NULL,11550,23.04,'En devolución - En trámite','Normal','2023-01-09 10:15:00','2023-01-09 13:25:00',NULL,'2023-03-10 12:00:00',NULL,'2023-03-21 12:00:00',NULL,17,1,120124829);
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
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
