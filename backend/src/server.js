require('dotenv').config(); // Carga variables de entorno al inicio
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.use(express.json());

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
