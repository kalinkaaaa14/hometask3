const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    getAllFighters() {
        return FighterRepository.getAll()
    }
    search(search) {
        const item = FighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
    getOne(id) {
        const item = this.search({id});
        if (!item) {
            const error = new Error("Fighter is not found")
            error.code = 404
            throw error
        }
        return item;
    }
    saveNewFighter({name, health, power,defense}) {
        const uniqueName = this.search({name})
        if (uniqueName) {
            const error = new Error("Fighter's name should be unique")
            error.code = 400
            throw error
        }
        return FighterRepository.create({name, health, power, defense})
    }

    update(id, {name, health, power, defense}) {
        const fighter = FighterRepository.update(id, {name, health, power, defense})
        if (!fighter) {
            const error = new Error("Fighter is not found")
            error.code = 404
            throw error
        }
        return fighter
    }

    delete(id) {
        const fighter = FighterRepository.delete(id)
        if (!fighter) {
            const error = new Error("Fighter is not found")
            error.code = 404
            throw error
        }
        return fighter
    }
}

module.exports = new FighterService();