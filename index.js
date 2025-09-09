const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

// --- CONEXIÓN A LA BASE DE DATOS CON MONGOOSE ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connection successful!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Detener la app si no se puede conectar a la DB
    });

const app = express();

// Configuración de directorio público
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Middlewares para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración del middleware de express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 hora
    }
}));

// Definición de Rutas
app.use('/', require('./routes/page.js'));
app.use('/auth', require('./routes/auth.js'));

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
