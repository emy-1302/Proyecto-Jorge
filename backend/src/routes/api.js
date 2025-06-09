const express = require('express');
const router = express.Router();
const graficaController = require('../controllers/graficaController');

router.get('/arbolesPorProyecto', graficaController.arbolesPorProyecto);
router.get('/contarArboles', graficaController.contarArboles);
router.get('/alturaPromedio', graficaController.alturaPromedio);
router.get('/capacidadTotalRiego', graficaController.capacidadTotalRiego);
router.get('/informesEmpleado', graficaController.informesEmpleado);
router.get('/actividadesEmpleado', graficaController.actividadesEmpleado);
router.get('/detallesProyecto', graficaController.detallesProyecto);
router.get('/informesProyecto', graficaController.informesProyecto);
router.get('/equiposProyecto', graficaController.equiposProyecto);
router.get('/materialesActividad', graficaController.materialesActividad);

module.exports = router;
