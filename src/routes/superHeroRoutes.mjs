import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

//Validaciones

const validateCreateSuperhero = [
    body('nombreSuperHeroe').trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Nombre del superhéroe es requerido'),
    body('nombreReal').trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Nombre real es requerido'),
    body('edad').isInt({ min: 0 }).trim().withMessage('Edad debe ser un número entero positivo'),
    body('planetaOrigen').optional().isString().withMessage('Planeta de origen debe ser una cadena'),
    body('debilidad').optional().isString().withMessage('Debilidad debe ser una cadena'),
    body('poderes').isArray({ min: 1 }).trim().withMessage('Poderes debe ser un arreglo con al menos un elemento'),
    body('poderes.*').trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Cada poder debe ser una cadena no vacía'),
    body('aliados').optional().isArray().withMessage('Aliados debe ser un arreglo'),
    body('aliados.*').optional().isString().notEmpty().withMessage('Cada aliado debe ser una cadena no vacía'),
    body('enemigos').optional().isArray().withMessage('Enemigos debe ser un arreglo'),
    body('enemigos.*').optional().isString().notEmpty().withMessage('Cada enemigo debe ser una cadena no vacía'),
    body('creador').optional().isString().withMessage('Creador debe ser una cadena')
];

const validateUpdateSuperhero = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('nombreSuperHeroe').optional().trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Nombre del superhéroe debe ser una cadena no vacía'),
    body('nombreReal').optional().trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Nombre real debe ser una cadena no vacía'),
    body('edad').optional().isInt({ min: 0 }).trim().withMessage('Edad debe ser un número entero positivo'),
    body('planetaOrigen').optional().isString().withMessage('Planeta de origen debe ser una cadena'),
    body('debilidad').optional().isString().withMessage('Debilidad debe ser una cadena'),
    body('poderes').optional().isArray().withMessage('Poderes debe ser un arreglo'),
    body('poderes.*').optional().trim().isLength({ min: 3, max: 60 }).isString().notEmpty().withMessage('Cada poder debe ser una cadena no vacía'),
    body('aliados').optional().isArray().withMessage('Aliados debe ser un arreglo'),
    body('aliados.*').optional().isString().notEmpty().withMessage('Cada aliado debe ser una cadena no vacía'),
    body('enemigos').optional().isArray().withMessage('Enemigos debe ser un arreglo'),
    body('enemigos.*').optional().isString().notEmpty().withMessage('Cada enemigo debe ser una cadena no vacía'),
    body('creador').optional().isString().withMessage('Creador debe ser una cadena')
];

const validarRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//Rutas Existentes

router.get('/heroes', obtenerTodosLosSuperheroesController); //Punto 1
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

//Rutas Nuevas

router.post('/heroes', validateCreateSuperhero, validarRequest, crearSuperheroeController);

router.put('/heroes/:id', validateUpdateSuperhero, validarRequest, actualizarSuperheroeController);

router.delete('/heroes/:id', eliminarSuperheroePorIdController);

router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;