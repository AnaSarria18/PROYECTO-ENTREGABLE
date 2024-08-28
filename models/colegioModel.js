const db = require("../config/db.js");

/* funcion del get de colegios  */
function mostrarColegios(callback) {
    const consultaColegios = "SELECT * FROM colegio";
    db.query(consultaColegios, (err,results)=> {
        if(err) {
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    });
}



/* funcion post de colegios */ 
function agregarColegio(nuevoColegio, callback){
    let iColegio= "INSERT INTO colegio (nombre, direccion, telefono, email)VALUES(?,?,?,?)";
    db.query(iColegio, [nuevoColegio.nombre, nuevoColegio.direccion, nuevoColegio.telefono, nuevoColegio.email], (err, results)=> {
        if(err) {
            console.log("inserccion no realizada");
            callback(err);
        }
        else{
            callback(results)
        }
    });
}



/* funcion delete para colegio  */
function eliminarColegio(colegioId, callback){
    const queryEliminado = "delete from colegio where id=?";
    db.query(queryEliminado,[colegioId],(err, results) => {
        if(err){
            console.log("error al  eliminar el colegio");
            callback(err);
        }
        else{
            callback(null, results);
        }
    });
}



/* funcion put para colegio  */
function actualizarColegio(colegioId,nuevosDatosColegio, callback){
    let acolegio = "UPDATE colegio SET nombre=?, direccion=?, telefono=?, email=?  WHERE id=?";
    db.query(acolegio, [nuevosDatosColegio.nombre, nuevosDatosColegio.direccion, nuevosDatosColegio.telefono, nuevosDatosColegio.email, colegioId], (err, results)=> {
        if(err) {
            console.log('Error');
        }else{
            const colegio = "SELECT * FROM colegio where id=?";
            db.query(colegio,[colegioId], (err , results) => {
                if (err) {
                    console.log("consulta no realizada")
                } else {
                    callback(null , results [0])
                }
            })
        }
    });
};



/* funcion para contar los colegios  */
function contarColegios(callback) {
    const PoderContarColegios = "SELECT COUNT(*) AS total FROM colegio";
    db.query(PoderContarColegios, (err, results) => {
        if (err) {
            console.log("Error al contar los colegios");
        } else {
            callback(results[0].total);
        }
    });
}



module.exports = {mostrarColegios, agregarColegio, eliminarColegio, actualizarColegio, contarColegios};