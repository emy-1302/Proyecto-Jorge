const pool = require('../config/db.js');

const handleError = (res, err) => {
  console.error('⚠️ Error SQL:', err);

  let mensaje = 'Ocurrió un error desconocido en la consulta';
  let codigo = 500;

  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    mensaje = 'Acceso denegado a la base de datos (usuario o contraseña incorrectos)';
  } else if (err.code === 'ER_BAD_DB_ERROR') {
    mensaje = 'La base de datos no existe';
  } else if (err.code === 'ER_PARSE_ERROR') {
    mensaje = 'Error de sintaxis en la consulta SQL';
  } else if (err.code === 'PROCEDURE_NOT_FOUND') {
    mensaje = 'El procedimiento almacenado no fue encontrado';
  } else if (err.code === 'ECONNREFUSED') {
    mensaje = 'No se pudo conectar al servidor de base de datos';
  } else if (err.code === 'ER_BAD_FIELD_ERROR') {
    mensaje = `Campo inválido en la consulta: ${err.sqlMessage}`;
  } else if (err.code === 'ER_SP_DOES_NOT_EXIST') {
    mensaje = 'El procedimiento almacenado no existe';
  }

  res.status(codigo).json({
    error: mensaje,
    detalle: err.message,
    sqlState: err.sqlState,
    codigoError: err.code,
    stack: err.stack
  });
};


exports.arbolesPorProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ArbolesPorProyecto()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.contarArboles = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_TotalArbolesPorProyecto()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.alturaPromedio = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_AlturasArboles()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.capacidadTotalRiego = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_SistemasRiego()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.informesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_InformesPorEmpleado()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.actividadesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_ActividadesEmpleados()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.detallesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_DetallesProyectos()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.informesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_InformesPorProyecto()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.equiposProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_EquiposPorProyecto()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

exports.materialesActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_MaterialesPorActividad()');
    res.json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};
