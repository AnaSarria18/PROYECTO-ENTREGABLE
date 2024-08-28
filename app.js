const express = require('express');
const app = express();
const PORT=3000;
app.use(express.json());
const {mostrarColegios, agregarColegio, eliminarColegio, actualizarColegio, contarColegios,  } = require("./models/colegioModel.js");

const {mostrarEstudiantes,agregarEstudiante, eliminarEstiduante,actualizarEstudiante, contarEstudiantes} = require("./models/estudianteModel.js");


/* get de colegio */
app.get('/colegio',(req,res)=>{
    mostrarColegios((results) => {
       return res.json(results);
    })
}); 


/* post de colegio */
app.post('/colegio',(req,res) => {
    let nuevoColegio = req.body
    if( !nuevoColegio.nombre || !nuevoColegio.direccion || !nuevoColegio.telefono || !nuevoColegio.email)
    {
        return res.send("Faltan Datos de colegio")
    }
    else{
        agregarColegio(nuevoColegio, (results) => {
            res.json({mensaje:"colegio agregado"})
        })
    }

});


/* delete de colegio */
app.delete('/colegio/:id',(req,res)=>{
    let colegioId=req.params.id;
    eliminarColegio(colegioId, (err, results) => {
        if(err){
            return res.send("error para eliminar el colegio");
        }
        else{
          return  res.json({mensaje: "colegio eliminado correctamente"})
        }
    });
   
});



/* put de colegio */
app.put('/colegio/:id', (req, res) => {
    let colegioId = req.params.id;
    const nuevosDatosColegio = req.body
    actualizarColegio (colegioId, nuevosDatosColegio,(err, results) => { 
        res.json(results)
    })
});






/* contar los colegios  */
app.get('/colegio/count', (req, res) => {
    contarColegios((total) => {
        res.json({ totaldeColegios: total });
    });
});





/* CRUPP DE ESTUDIANTE */

/* get de estudiante */
app.get('/estudiante', (req, res) => {
    mostrarEstudiantes((results) => {
        res.json(results);
    });
});



/* agregar un nuevo estudinate  */
app.post('/estudiante', (req, res) => {
    const nuevoEstudiante = req.body;
    if (!nuevoEstudiante.nombre || !nuevoEstudiante.apellido || !nuevoEstudiante.sexo || !nuevoEstudiante.correo || !nuevoEstudiante.id_colegio) {
        return res.send("Faltan Datos del estudiante");
    } else {
        agregarEstudiante(nuevoEstudiante, (results) => {
            res.json({ mensaje: "Estudiante agregado" });
        });
    }
});




/* eliminar un estudiante  */
app.delete('/estudiante/:id', (req, res) => {
    const estudianteId = req.params.id;
    eliminarEstiduante(estudianteId, (err, results) => {
        if (!err) {
            return res.send("Error al eliminar el estudiante");
        } else {
            return res.json({ mensaje: "Estudiante eliminado correctamente" });
        }
    });
});




/* actualizar un estudiante  */
app.put('/estudiante/:id', (req, res) => {
    const estudianteId = req.params.id;
    const nuevosDatosEstudiante = req.body;
    actualizarEstudiante(estudianteId, nuevosDatosEstudiante, (err, results) => {
        if (err) {
            return res.send("Error al actualizar el estudiante");
        } else {
            res.json(results);
        }
    });
});



/* contar los estudiantes  */
app.get('/estudiante/count', (req, res) => {
    contarEstudiantes((total) => {
        res.json({ totalEstudiantes: total });
    });
});





/* correr el servidor */
app.listen(PORT, ()=>{
    console.log("SERVIDOR CORRIENDO EN EL PUERTO 3000")
});

