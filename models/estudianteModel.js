const db = require("../config/db.js");

/* funcion del get para mostrar estudiantes */
function mostrarEstudiantes(callback) {
    const consultaEstudiantes = "SELECT * FROM estudiante";
    db.query(consultaEstudiantes, (err,results)=> {
        if(err) {
            console.log("consulta no realizada");
        
        }
        else{
            callback(results);
        }
    });
}



/* funcion post de estudiantes */ 
function agregarEstudiante(nuevoEstudiante, callback){
    let iEstudiante= "INSERT INTO estudiante (nombre, apellido, sexo, correo, id_colegio)VALUES(?,?,?,?,?)";
    db.query(iEstudiante, [nuevoEstudiante.nombre, nuevoEstudiante.apellido, nuevoEstudiante.sexo, nuevoEstudiante.correo, nuevoEstudiante.id_colegio], (err, results)=> {
        if(err) {
            console.log("inserccion no realizada")
        }
        else{
            callback(results)
        }
    });
}



/* funcion delete para estudiantes  */
function eliminarEstiduante(estudianteId, callback){
    const queryEliminado = "delete from estudiante where id_estudiante = ?";
    db.query(queryEliminado,[estudianteId],(err, results) => {
        if(err){
            console.log("error al  eliminar el estudiante");
        }
        else{
            callback(results)
        }
    });
}



/* funcion put para estudiante */
function actualizarEstudiante(estudianteId,nuevosDatosEstudiante, callback){
    let aEstudiante = "UPDATE estudiante SET nombre=?, apellido=?, sexo=?, correo=?, id_colegio= ? WHERE id_estudiante = ?";
    db.query(aEstudiante, [nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.sexo, nuevosDatosEstudiante.correo, nuevosDatosEstudiante.id_colegio, estudianteId], (err, results)=> {
        if(err) {
            console.log('Error al actualizar el estudiante');
        }else{
            const estudiante = "SELECT * FROM estudiante where id_estudiante = ?";
            db.query(estudiante,[estudianteId], (err , results) => {
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
 function contarEstudiantes(callback) {
    const PoderContarEstudiantes = "SELECT COUNT(*) AS total FROM estudiante";
    db.query(PoderContarEstudiantes, (err, results) => {
        if (err) {
            console.log("Error al contar los estudiantes");
        } else {
            callback(results[0].total);
        }
    });
}



module.exports = {mostrarEstudiantes, agregarEstudiante, eliminarEstiduante, actualizarEstudiante,contarEstudiantes};