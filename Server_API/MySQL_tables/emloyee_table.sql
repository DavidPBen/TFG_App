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
  UNIQUE KEY `DNI_UNIQUE` (`DNI`)
)

SELECT * FROM employee_table;

INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Juan Fuentes de la Torre", "juan@gmail.com", "12345678A", 915648235, AES_ENCRYPT ('12345aaaa', 'tfg'), "repartidor", 15, 1, ""); 
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Pedro Perez", "pedro@gmail.com", "56359877L", 644359874, AES_ENCRYPT ('12345aaaa', 'tfg'), "repartidor", 16, 1, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("María López", "m.lopez@gmail.com", "78858688K", 647496954, AES_ENCRYPT ('12345aaaa', 'tfg'), "repartidor", 17, 1, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("David Benito", "david@gmail.com", "08976544J", 633578874, AES_ENCRYPT ('12345aaaa', 'tfg'), "atención al cliente", 23, 1, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("María Izquierdo", "maria@gmail.com", "44663598R", 655399854, AES_ENCRYPT ('12345aaaa', 'tfg'), "atención al cliente", 24, 0, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Celia Fernández", "celia.f@gmail.com", "03565589S", 644365578, AES_ENCRYPT ('12345aaaa', 'tfg'), "atención al cliente", 25, 1, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Juan Carlos", "juan.c@gmail.com", "32565547F", 655123486, AES_ENCRYPT ('12345aaaa', 'tfg'), "manager", 35, 0, "");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Ana García", "ana.g@gmail.com", "02547866B", 663562894, AES_ENCRYPT ('12345aaaa', 'tfg'), "manager", 36, 1,"");
INSERT INTO employee_table (Name, Email, DNI, Phone, Password, Role, Employee_Id, Active, Password_Try) VALUES("Ana Derecho", "ana.der@gmail.com", "54263555F", 655478951, AES_ENCRYPT ('12345aaaa', 'tfg'), "atención al cliente", 26, 0, "");

