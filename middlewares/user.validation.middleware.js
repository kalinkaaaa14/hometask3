const { user } = require('../models/user');

const createUserValid = (req, res, next) => {
    let errors = [];
    const {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
    if (req.body.id) {
        errors.push("Field 'id' should not be passed during creation")
    }

    if (Object.keys(rest).length > 0) {
        errors.push("Request has a property that don't match with the User model")
    }
    if (!firstName || firstName === '') {
        errors.push("First name is mandatory")
    }
    if (!lastName || lastName === '') {
        errors.push("Last name is mandatory")
    }

    if (!email) {
        errors.push("Email is mandatory")
    } else if (!(/^\w+([\.-]?\w+)*@gmail\.com$/.test(email))) {
        errors.push("Email account should be gmail client")
    }

    if (!phoneNumber || phoneNumber === '') {
        errors.push("Phone is mandatory")
    } else if (!phoneNumber.startsWith('+380') || phoneNumber.length !== 13) {
        errors.push("Phone should be in such format: +380xxxxxxxxx")
    }

    if (!password || password === '') {
        errors.push("Password is mandatory")
    } else if (password.length < 3) {
        errors.push("Minimum length on the password - 3")
    }

    if (errors.length !== 0) {
        res.err = errors
    }
    next();
}

const updateUserValid = (req, res, next) => {
    let errors = [];
    const {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
    if (req.body.id) {
        errors.push("Field 'id' should not be passed in body during updating")
    }
    if (Object.keys(rest).length > 0) {
        errors.push("Request has too much properties for updating User model")
    }

    if (Object.keys(req.body).length === 0) {
        errors.push("There should be at least 1 property in request")
    }

    if (!firstName && !lastName && !email && !phoneNumber && !password) {
        errors.push("Request doesn't have any field from the User model")
    }

    if (errors.length !== 0) {
        res.err = errors
    }
    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;