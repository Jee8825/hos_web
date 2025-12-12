const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
