const mysql = require("mysql2");

/* crear la coneccion a la base de datos  */
const db = mysql.createConnection({
    /* establecemos los parametros de la coneccion */
    host: "localhost",
    user: "root",
    password: "CTPI2024*",
    database: "colegio_a"
});

db.connect((e)=>{
    if(e) {
        console.log("error en la conexion")
    }
    else{
        console.log("conectado a Mysql")
    }
});

module.exports = db;

