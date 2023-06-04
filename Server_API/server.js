// Configuración del servidor para la conexión con la base de datos MySQL.

const express = require('express')
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes')
const app = express()

app.set('port', process.env.PORT || 8000)
const dbConfiguration= {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'toor',
    database: 'bd_tfg'
}

app.use(myconnection(mysql, dbConfiguration, 'single'))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(app.get('port'))