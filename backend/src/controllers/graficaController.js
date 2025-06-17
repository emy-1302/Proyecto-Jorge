const pool = require('../config/db.js');

// 1. Árboles por proyecto (agrupado)
exports.arbolesPorProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerArbolesPorProyecto()');
    // Si tu procedure no agrupa, hazlo aquí:
    // Suponiendo que rows[0] tiene campos: proyecto_idProyecto
    const conteo = {};
    console.log(row[0]);
    rows[0].forEach(row => {
      const key = row.proyecto_idProyecto || row.proyecto || row.idProyecto || 'Sin Proyecto';
      conteo[key] = (conteo[key] || 0) + 1;
    });
    const labels = Object.keys(conteo);
    const values = Object.values(conteo);
    
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 2. Total de árboles plantados (solo número)
exports.contarArboles = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ContarArbolesPorProyecto()');
    const total = rows[0][0]?.total_arboles || 0;
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 3. Altura promedio de árboles
exports.alturaPromedio = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_CalcularAlturaMediaArboles()');
    const altura = rows[0][0]?.altura_media || 0;
    res.json({ altura });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 4. Capacidad total de riego
exports.capacidadTotalRiego = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_SumarCapacidadRiego()');
    const capacidad = rows[0][0]?.capacidad_total || 0;
    res.json({ capacidad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 5. Informes por empleado (agrupa por empleado)
exports.informesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerInformesDeEmpleado()');
    // Suponiendo que rows[0] tiene campo empleado_idEmpleado
    const conteo = {};
    rows[0].forEach(row => {
      const key = row.empleado_idEmpleado || row.empleado || 'Empleado';
      conteo[key] = (conteo[key] || 0) + 1;
    });
    const labels = Object.keys(conteo);
    const values = Object.values(conteo);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 6. Actividades por empleado (agrupa por empleado)
exports.actividadesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerActividadesDeEmpleado()');
    // Suponiendo que rows[0] tiene campo empleado_idEmpleado
    const conteo = {};
    rows[0].forEach(row => {
      const key = row.empleado_idEmpleado || row.empleado || 'Empleado';
      conteo[key] = (conteo[key] || 0) + 1;
    });
    const labels = Object.keys(conteo);
    const values = Object.values(conteo);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 7. Detalles de proyectos (devuelve nombre y algún detalle)
exports.detallesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerDetallesProyecto()');
    // Ejemplo: nombre, ciudad, estado, pais
    const labels = rows[0].map(row => row.nombre || row.idProyecto || 'Proyecto');
    const ciudades = rows[0].map(row => row.ciudad || '');
    const estados = rows[0].map(row => row.estado || '');
    const paises = rows[0].map(row => row.pais || '');
    res.json({ labels, ciudades, estados, paises });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 8. Informes por proyecto (agrupa por proyecto)
exports.informesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerInformesProyecto()');
    // Suponiendo que rows[0] tiene campo proyecto_idProyecto
    const conteo = {};
    rows[0].forEach(row => {
      const key = row.proyecto_idProyecto || row.proyecto || 'Proyecto';
      conteo[key] = (conteo[key] || 0) + 1;
    });
    const labels = Object.keys(conteo);
    const values = Object.values(conteo);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 9. Equipos por proyecto (agrupa por proyecto)
exports.equiposProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerEquiposProyecto()');
    // Suponiendo que rows[0] tiene campo proyecto_idProyecto
    const conteo = {};
    rows[0].forEach(row => {
      const key = row.proyecto_idProyecto || row.proyecto || 'Proyecto';
      conteo[key] = (conteo[key] || 0) + 1;
    });
    const labels = Object.keys(conteo);
    const values = Object.values(conteo);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 10. Materiales por actividad (agrupa por actividad y material)
exports.materialesActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ObtenerMaterialesPorActividad()');
    // Suponiendo que rows[0] tiene campos: actividad_idActividad, material (nombre), cantidad
    // Agrupa por actividad y material
    const actividades = {};
    const materialesSet = new Set();

    rows[0].forEach(row => {
      const act = row.actividad_idActividad || 'Actividad';
      const mat = row.material || 'Material';
      const cantidad = row.cantidad || 1;
      materialesSet.add(mat);
      if (!actividades[act]) actividades[act] = {};
      actividades[act][mat] = (actividades[act][mat] || 0) + cantidad;
    });

    const labels = Object.keys(actividades);
    const materiales = Array.from(materialesSet);

    // Construir datasets para cada material
    const datasets = materiales.map((mat, idx) => ({
      label: mat,
      data: labels.map(act => actividades[act][mat] || 0),
      backgroundColor: ['#7986cb', '#9fa8da', '#c5cae9', '#d1c4e9', '#b2dfdb'][idx % 5]
    }));

    res.json({ labels, datasets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};
