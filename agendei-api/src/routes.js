
import express from "express";
import  Router  from "express";
import controllerDoctor from "../src/controllers/controller.doctor.js";
import jwt from '../token.js';
import controllerUser from '../src/controllers/controller.user.js'; // Corrigido
import controllerAppointment from '../src/controllers/controller.appointment.js'; // Corrigido

const router = Router();

// Mudando de POST para GET para listar médicos
router.get("/doctors", controllerDoctor.Listar);
router.post("/doctors" , controllerDoctor.InserirDoc);
router.put("/doctors/:id_doctor" , controllerDoctor.Editar);
router.delete("/doctors/:id_doctor" , controllerDoctor.Excluir);
router.get("/doctors/:id_doctor/services" , controllerDoctor.ListarServicos);

// Users...
router.post("/users/register",controllerUser.Inserir);
router.post("/users/login",controllerUser.Login);
router.get("/users/profile", controllerUser.Profile);

// Reservas (appointments)...
router.get("/appointments", controllerAppointment.ListarByUser);
router.post("/appointments", controllerAppointment.Inserir);

export default router;
