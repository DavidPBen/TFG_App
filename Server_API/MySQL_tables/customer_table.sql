CREATE TABLE `customer_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(70) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Customer_Id` varchar(45) NOT NULL,
  `Phone` int NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Password` blob NOT NULL,
  `Password_Try` blob NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `Customer_Id_UNIQUE` (`Customer_Id`)
) 

SELECT * FROM customer_table;

INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("Emilio Jimenez Perez", "emilio@gmail.com", "02133456A", 655987866, "Calle San Basilio, 14, 3ºB, 25024", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("Juan Alfonso Gómez", "juanalfo@gmail.com", "02346822B", 666896534, "Calle Hierro, 65, 2ºA, 32087", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("Adriana García Sanchez", "adriana@gmail.com", "78569452B", 678965204, "Calle Fauna, 12, 1ºA, 28026", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("NTTDATA", "ntt_data@nttdata.everys.com", "B82387770", 917490000, "Calle Fuente de la Mora, 1, 28050", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("BBVA", "info@bbva.com", "A48265169", 917456984, "Calle de San Nicolás, 4, 48005", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("Banco Santander", "banco@santander.com", "B82374085", 917516874, "Calle Fuente de la Mora, 7, 28050", "12345", "");
INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES("Alfonso García Benito", "alf.g@gmail.com", "15235414S", 615414425, "Calle de Hierro, 1, 12011", "12345", "");

UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '1');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '3');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '5');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '6');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '7');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '8');
UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_ENCRYPT ('12345aaaa', 'tfg') WHERE (`Id` = '9');

UPDATE `bd_tfg`.`customer_table` SET `Password` = AES_DECRYPT (Password, 'tfg') WHERE (`Id` = '9');

