import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }
    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }
    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    // Implementación de los nuevos métodos

    async crear(datos) {
        const nuevoSuperHeroe = new SuperHero(datos);
        return await nuevoSuperHeroe.save();
    }
    async actualizar(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }
    async eliminarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }
    async eliminarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombre });
    }
}

export default new SuperHeroRepository();
