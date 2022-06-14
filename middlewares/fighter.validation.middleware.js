const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    let errors = [];
    let {name, health, power, defense, ...rest} = req.body

    if (req.body.id) {
        errors.push("Field 'id' should not be passed during creation")
    }

    if (Object.keys(rest).length > 0) {
        errors.push("Request has too much properties for Fighter model")
    }
    if (!name || name === '') {
        errors.push("Name is mandatory")
    }

    if (health) {
        if(!Number.isFinite(Number(health)) || !(health >=80 && health <=120)){
            errors.push("Health should be a number between 80 and 120")
        }
    } else {
        req.body.health = "100"
    }

    if(power){
        if(!Number.isFinite(Number(power)) || !(power >=1 && power <=100)){
            errors.push("Power should be a number between 1 and 100")
        }
    }else{
        errors.push("Power is mandatory")
    }

    if(defense){
        if(!Number.isFinite(Number(defense)) || !(defense >=1 && defense <= 10)){
            errors.push("Defense should be a number between 1 and 10")
        }
    }else{
        errors.push("Defense is mandatory")
    }

    if (errors.length !== 0) {
        res.err = errors
    }
    next();
}

const updateFighterValid = (req, res, next) => {
    let errors = []
    let {name, health, power, defense, ...rest} = req.body

    if (req.body.id) {
        errors.push("Field 'id' should not be passed during creation")
    }

    if (Object.keys(rest).length > 0) {
        errors.push("Request has too much properties for Fighter model")
    }

    if (Object.keys(req.body).length === 0) {
        errors.push("There should be at least 1 property in request")
    }

    if (health) {
        if(!Number.isFinite(Number(health)) || !(health >=80 && health <=120)){
            errors.push("Health should be a number between 80 and 120")
        }
    }

    if(power){
        if(!Number.isFinite(Number(power)) || !(power >=1 && power <=100)){
            errors.push("Power should be a number between 1 and 100")
        }
    }

    if(defense){
        if(!Number.isFinite(Number(defense)) || !(defense >=1 && defense <= 10)){
            errors.push("Defense should be a number between 1 and 10")
        }
    }

    if (errors.length !== 0) {
        res.err = errors
    }
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;