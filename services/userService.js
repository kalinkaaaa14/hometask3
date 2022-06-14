const { UserRepository } = require('../repositories/userRepository');

class UserService {


    saveNewUser({firstName, lastName, email, phoneNumber, password}) {
        const uniqueEmail = this.search({email})
        if (uniqueEmail) {
            const error = new Error("Email should be unique")
            error.code = 400
            throw error
        }
        const uniquePhone = this.search({phoneNumber})
        if (uniquePhone) {
            const error = new Error("Phone should be unique")
            error.code = 400
            throw error
        }
        return UserRepository.create({firstName, lastName, email, phoneNumber, password})
    }

    getAllUsers() {
        return UserRepository.getAll();
    }

    update(id, {firstName, lastName, email, phoneNumber, password}) {
        const user = UserRepository.update(id, {firstName, lastName, email, phoneNumber, password})
        if (!user) {
            const error = new Error("User not found")
            error.code = 404
            throw error
        }
        return user
    }

    delete(id) {
        const user = UserRepository.delete({id})
        if (!user) {
            const error = new Error("User not found")
            error.code = 404
            throw error
        }
        return user
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    getOne(id) {
        const item = this.search({id});
        if (!item) {
            throw Error("User is not found")
        }
        return item;
    }
}

module.exports = new UserService();