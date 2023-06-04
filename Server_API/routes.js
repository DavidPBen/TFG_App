// Funciones que permiten la comunicación con la base de datos, utilizando peticiones GET, POST, PUT y DELETE.

const express = require('express')
const nodemailer = require('nodemailer')
const routes = express.Router()

// Recoge los datos de la tabla de empleados. A excepción de la contraseña.
routes.get('/employee_table', (req, res)=>{

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT Id, Name, Email, DNI, Phone, Role, Employee_Id, Active FROM employee_table', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Recoge los datos de la tabla de clientes. A excepción de la contraseña.
routes.get('/customer_table', (req, res)=>{

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT Id, Name, Email, Customer_Id, Phone, Address FROM customer_table', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Recoge los datos de la tabla de pedidos.
routes.get('/order_table', (req, res)=>{

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT * FROM order_table', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Recoge los datos de la tabla de paquetes.
routes.get('/package_table', (req, res)=>{

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT * FROM package_table', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Recoge los datos del empleado que ha iniciado sesión. Para ello compara la contraseña introducida con la contraseña almacenada en la base de datos, ámbas cifradas.
routes.get('/employee_table/login',(req, res)=>{
    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT Id, Name, Email, DNI, Phone, Role, Employee_Id FROM employee_table WHERE (Password = Password_Try)', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Recoge los datos del cliente que ha iniciado sesión. Para ello compara la contraseña introducida con la contraseña almacenada en la base de datos, ámbas cifradas.
routes.get('/customer_table/login',(req, res)=>{
    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('SELECT Id, Name, Email, Customer_Id, Phone, Address FROM customer_table WHERE (Password = Password_Try)', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Permite la creación de una nueva tupla en una tabla de la base de datos.
routes.post('/:table', (req, res)=>{
    const table = req.params.table;
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('INSERT INTO '+table+' set ?', [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Permite la creación de una nueva tupla en la tabla de clientes. Usada para el registro de nuevos clientes.
routes.post('/customer_table/create', (req, res)=>{
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('INSERT INTO customer_table (Name, Email, Customer_Id, Phone, Address, Password, Password_Try) VALUES ( ? )', [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Permite la creación de una nueva tupla en la tabla de empleados. Usada para el registro de nuevos empleados.
routes.post('/employee_table/create', (req, res)=>{
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('INSERT INTO employee_table (Name, Email, DNI, Phone, Role, Employee_Id, Password_Try, Active, Password) VALUES ( ? )', [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Permite el envío de un correo electrónico con nodemailer.
routes.post('/send_email/:correo/:asunto', async (req, res)=>{
    const body = req.body.msg;
    const correo = req.params.correo;
    const asunto = req.params.asunto;

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'justasecondtfg@gmail.com',
            pass: 'gqsjxrwwmmtchzyx'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    const message = {
        from: 'justasecondtfg@gmail.com',
        to: correo, 
        subject: asunto, 
        html: `<div> ${body} </div>`
    };

    await transporter.sendMail(message, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });

})

// Borra una tupla de una tabla de la base de datos.
routes.delete('/:table/:id', (req, res)=>{
    const table = req.params.table;
    const id = req.params.id;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('DELETE FROM '+table+' WHERE id = '+id, (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza la columna de Password_Try de la tabla de empleados o clientes, limpiando todos los valores de dicha columna. Usada para el inicio de sesión.
routes.put('/:table/login', (req, res)=>{
    const table = req.params.table;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE '+table+' set Password_Try = \'\' WHERE (Password_Try != \'\')', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de una tabla de empleados, encargándose de cifrar la contraseña introducida por el usuario. Se usa en el login.
routes.put('/employee_table/password_try/:id', (req, res)=>{
    const id = req.params.id;
    const privatekey = 'tfg';
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE employee_table set Password_Try = AES_ENCRYPT(\''+ body +'\',\''+privatekey+'\') WHERE id = '+id, (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de una tabla de clientes, encargándose de cifrar la contraseña introducida por el usuario. Se usa en el login.
routes.put('/customer_table/password_try/:id', (req, res)=>{
    const id = req.params.id;
    const privatekey = 'tfg';
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE customer_table set Password_Try = AES_ENCRYPT(\''+ body +'\',\''+privatekey+'\') WHERE id = '+id, (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de una tabla de la base de datos.
routes.put('/:table/:id', (req, res)=>{
    const table = req.params.table;
    const id = req.params.id;
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE '+table+' set ? WHERE id = '+id, [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de la tabla de empleados, encargándose de cifrar la contraseña. Se usa al añadir un empleado.
routes.put('/employee_table/create/:DNI', (req, res)=>{
    const DNI = req.params.DNI;
    const privatekey = 'tfg';
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE employee_table set Password = AES_ENCRYPT(\''+ body +'\',\''+privatekey+'\') WHERE DNI = \''+ DNI +'\'', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de la tabla de clientes, encargándose de cifrar la contraseña. Se usa al añadir un cliente.
routes.put('/customer_table/create/:Customer_Id', (req, res)=>{
    const Customer_Id = req.params.Customer_Id;
    const privatekey = 'tfg';
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE customer_table set Password = AES_ENCRYPT(\''+ body +'\',\''+privatekey+'\') WHERE Customer_Id = \''+ Customer_Id +'\'', (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de la tabla de pedidos, encargándose de activar el pedido. Se usa al enviar un nuevo pedido.
routes.put('/order_table/pay/:Order_exp_num', (req, res)=>{
    const Order_exp_num = req.params.Order_exp_num;
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE order_table SET Active = "1" WHERE Expedition_Number = '+ Order_exp_num, [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de la tabla de pedidos, encargándose de cambiar el estado. Se usa al devolver un pedido.
routes.put('/order_table/return_state/:Order_exp_num', (req, res)=>{
    const Order_exp_num = req.params.Order_exp_num;
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE order_table SET State = ? WHERE Expedition_Number = '+ Order_exp_num, [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Actualiza una tupla de la tabla de pedidos, encargándose de cambiar la fecha esperada de devolución. Se usa al devolver un pedido.
routes.put('/order_table/return_date/:Order_exp_num', (req, res)=>{
    const Order_exp_num = req.params.Order_exp_num;
    const body = req.body;

    req.getConnection((err, conn)=>{

        if(err) return res.send(err)
        conn.query('UPDATE order_table SET Expected_Return_Date = ? WHERE Expedition_Number = '+ Order_exp_num, [body], (err, rows)=>{

            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

// Conexión realizada por GitHub Copilot.
// Permite la creación de una nueva tupla en la tabla de clientes. Usada para el registro de nuevos clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.post('/customer_table/create/copilot', (req, res)=>{
    const {name, surname, email, password} = req.body
    const query = `
        SET @name = ?;
        SET @surname = ?;
        SET @email = ?;
        SET @password = ?;
        CALL customer_table_create(@name, @surname, @email, @password);
    `
    mysqlConnection.query(query, [name, surname, email, password], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'Customer created'})
        }else{
            console.log(err)
        }
    })
})

// Conexión realizada por GitHub Copilot.
// Permite la actualización de una tupla en la tabla de clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.put('/customer_table/update/copilot', (req, res)=>{
    const {id, name, surname, email, password} = req.body
    const query = `
        SET @id = ?;
        SET @name = ?;
        SET @surname = ?;
        SET @email = ?;
        SET @password = ?;
        CALL customer_table_update(@id, @name, @surname, @email, @password);
    `
    mysqlConnection.query(query, [id, name, surname, email, password], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'Customer updated'})
        }else{
            console.log(err)
        }
    })
})

// Conexión realizada por GitHub Copilot.
// Permite la eliminación de una tupla en la tabla de clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.delete('/customer_table/delete/:id/copilot', (req, res)=>{
    const {id} = req.params
    mysqlConnection.query('DELETE FROM customer_table WHERE id = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json({status: 'Customer deleted'})
        }else{
            console.log(err)
        }
    })
})

// Conexión realizada por GitHub Copilot.
// Permite la obtención de la tabla de clientes de la base de datos del puerto 8000.
routes.get('/customer_table/copilot', (req, res)=>{
    mysqlConnection.query('SELECT * FROM customer_table', (err, rows, fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err)
        }
    })
})

// Conexión realizada por Amazon CodeWhisperer.
// Permite la creación de una nueva tupla en la tabla de clientes. Usada para el registro de nuevos clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.post('/customer_table/create/codewhisperer', (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        conn.query('INSERT INTO customer_table set ?', [req.body], (err, rows) => {

            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// Conexión realizada por Amazon CodeWhisperer.
// Permite la actualización de una tupla en la tabla de clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.put('/customer_table/update/codewhisperer', (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        conn.query('UPDATE customer_table set ? WHERE Id = ?', [req.body, req.body.Id], (err, rows) => {

            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// Conexión realizada por Amazon CodeWhisperer.
// Permite la eliminación de una tupla en la tabla de clientes. Envía los datos del cliente a la base de datos del puerto 8000.
routes.delete('/customer_table/delete/codewhisperer', (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        conn.query('DELETE FROM customer_table WHERE Id = ?', [req.body.Id], (err, rows) => {

            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// Conexión realizada por Amazon CodeWhisperer.
// Permite la obtención de la tabla de clientes de la base de datos del puerto 8000.
routes.get('/customer_table/codewhisperer', (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        conn.query('SELECT * FROM customer_table', (err, rows) => {

            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

module.exports = routes