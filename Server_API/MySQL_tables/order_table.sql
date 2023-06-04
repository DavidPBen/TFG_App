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
  CONSTRAINT `Customer_Id` FOREIGN KEY (`Customer_Id`) REFERENCES `customer_table` (`Id`),
  KEY `Employee_In_Charge_idx` (`Employee_In_Charge`),
  CONSTRAINT `Employee_In_Charge` FOREIGN KEY (`Employee_In_Charge`) REFERENCES `employee_table` (`Employee_Id`)
) 

SELECT * FROM order_table;

INSERT INTO order_table (Customer_Id, Origin, Destination, Volume, Cost, State, Shipment_Type, Collection_Date, Expected_Collection_Date, Expected_Arrival_Date, Employee_In_Charge, Active, Expedition_Number)VALUES(1, "Calle San Basilio, 14, 3ºB, 25024", "Calle de la Luna, 1, 28001", 0.5, 10, "En almacén origen", "Normal", "2020-12-12 10:34:00", "2020-12-12 10:45:00", "2020-12-14 9:30:00", 17, "1", 032145785);
INSERT INTO order_table (Customer_Id, Origin, Destination, Additional_Destination, Volume, Cost, State, Shipment_Type, Collection_Date, Expected_Collection_Date, Expected_Arrival_Date, Commentary, Employee_In_Charge, Active, Expedition_Number)VALUES(3, "Calle Hierro, 65, 2ºA, 32087", "Calle Montero, 47, 1ºB, 56076","Calle Formentosa, 6, 1ºA, 56076", 50, 56.6, "En camino", "Rápido", "2023-01-08 16:15:00", "2023-01-08 17:00:00", "2023-01-09 8:45:00","Necesito que llegue lo antes posible, es urgente.", 15, "1", 126762534);
INSERT INTO order_table (Customer_Id, Origin, Destination, Volume, Cost, State, Shipment_Type, Collection_Date, Expected_Collection_Date, Arrival_Date, Expected_Arrival_Date, Commentary, Employee_In_Charge, Active, Expedition_Number)VALUES(5, "Calle Olvido, 33, 24078", "Calle Mariposa, 67, 28025", 32, 46.6, "Entregado", "Normal", "2022-12-25 21:56:00", "2022-12-25 21:00:00", "2022-12-28 15:15:00","2022-12-28 15:20:00", "Si no estoy llamen al 912524654", 16, "0", 897654543);
INSERT INTO order_table (Customer_Id, Origin, Destination, Volume, Cost, State, Shipment_Type, Expected_Collection_Date, Expected_Arrival_Date, Employee_In_Charge, Active, Expedition_Number)VALUES(6, "Calle Fuente de la Mora, 1, 28050", "Calle Estocolmo, 27, 28045", 234, 89.3, "En trámite", "Normal", "2022-12-21 12:35:00","2022-12-23 12:00:00", 15, "1", 652412541);
INSERT INTO order_table (Customer_Id, Origin, Destination, Volume, Cost, State, Shipment_Type, Collection_Date, Expected_Collection_Date, Arrival_Date, Expected_Arrival_Date, Commentary, Employee_In_Charge, Active, Expedition_Number)VALUES(7, "Calle de San Nicolás, 4, 48005", "Calle Fresno, 61, 28036", 85, 57.5, "Entregado", "Rápido", "2022-11-17 16:13:00", "2022-11-17 13:20:00", "2022-11-19 09:43:00", "2022-11-19 10:00:00", "Pedido importante. Confiamos en vosotros", 16, "0", 128541245);
INSERT INTO order_table (Customer_Id, Origin, Destination, Additional_Destination, Volume, Cost, State, Shipment_Type, Expected_Collection_Date, Expected_Arrival_Date, Employee_In_Charge, Active, Expedition_Number)VALUES(8, "Calle Fuente de la Mora, 7, 28050", "Calle Lluvia, 11, 67056", "Calle Lluvia, 17, 67056", 45, 87.5, "En trámite", "Normal", "2022-12-27 8:58:00", "2023-01-03 12:30:00", 16, "1", 102142589);
INSERT INTO order_table (Customer_Id, Origin, Destination, Volume, Cost, State, Shipment_Type, Collection_Date, Expected_Collection_Date, Expected_Arrival_Date, Return_Date, Commentary, Employee_In_Charge, Active, Expedition_Number)VALUES(1, "Calle San Basilio, 14, 3ºB, 25024", "Calle de la Pesca, 1, 28024", 45, 15, "En devolución - En Trámite", "Normal", "2022-12-23 13:54:00", "2022-12-23 14:00:00", "2022-12-25 9:45:00", "2023-01-01 13:30:00", "Segundo pedido. Disculpen las molestias.", 17, "1", 012454785);
