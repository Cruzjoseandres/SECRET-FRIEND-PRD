require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const db = require("./models");

const app = express()
const port = process.env.PORT || 3000

//Para habilitar las carpetas públicas
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuración de carga de archivos
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}));
// Para habilitar la BD - alter:true crea/actualiza tablas automáticamente
db.sequelize.sync({
    alter: true // Crea tablas que no existen y actualiza columnas
}).then(() => {
    console.log("✅ Database synchronized successfully - tables created/updated");
}).catch((error) => {
    console.error("❌ Error synchronizing database:", error);
});


const cors = require('cors');

// Permitir solicitudes desde el frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // URL del frontend
    credentials: true
}));

require("./routes")(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
