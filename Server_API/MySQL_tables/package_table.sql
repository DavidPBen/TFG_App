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
)

SELECT * FROM package_table;

INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(1, 1.5, 1, 0.7, 0.7, 0.5, 0);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(2, 27, 4, 7, 1.78, 50, 1);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(3, 10.2, 1.7, 4, 3, 20.5, 0);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(3, 7.8, 2.5, 3, 1, 7.5, 0);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(3, 5.9, 2.3, 0.6, 2.89, 4, 1);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(4, 106.2, 3.84, 2.1, 12.3, 99.4, 1);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(4, 89.2, 5.1, 1.71, 15.4, 134.6, 1);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(5, 42.3, 2.25, 10.8, 3.5, 85, 0);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(6, 24.2, 1.49, 4.3, 7, 45, 0);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(7, 10.3, 2.2, 5.6, 2.76, 34, 1);
INSERT INTO package_table (Order_Id, Weight, Width, Height, Length, Volume, Fragility) VALUES(7, 6.3, 2.3, 3.6, 1.33, 11, 1);



