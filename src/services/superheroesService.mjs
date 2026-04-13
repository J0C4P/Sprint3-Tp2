import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

//

export async function crearSuperheroe(datos) {
    return await superHeroRepository.crear(datos);
}

export async function actualizarSuperheroe(id, datosActualizados) {
    return await superHeroRepository.actualizar(id, datosActualizados);
}

export async function eliminarSuperheroePorId(id) {
    return await superHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
    return await superHeroRepository.eliminarPorNombre(nombre);
}