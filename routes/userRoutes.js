const { Router } = require('express');
const UserService = require('../services/userService');
const {user} = require("../models/user");
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();


router.get('/', (req,res, next) => {
    try {
        const data = UserService.getAllUsers();
        res.data = data;
    } catch (err) {
        res.status(404)
        res.err = err.message;
    } finally {
        next();
    }
}, responseMiddleware)

router.get('/:id', (req,res, next) => {
    try {
        res.data = UserService.getOne(req.params.id)
        if (res.data) {
            res.status(200)
        }
    } catch (err) {
        res.status(404)
        res.err = err.message
    } finally {
        next()
    }
}, responseMiddleware)


router.post('/', createUserValid, (req,res, next) => {
    try {
        if (res.err) {
            res.status(400)
        } else {
            const {firstName, lastName, email, phoneNumber, password} = req.body
            res.data = UserService.saveNewUser({firstName, lastName, email, phoneNumber, password})
            res.status(201)
        }
    } catch (err) {
        res.err = err.message
        res.status(err.code ? err.code : 404)
    } finally {
        next()
    }
}, responseMiddleware)


router.put('/:id', updateUserValid, (req,res, next)=> {
    try {
        if (res.err) {
            res.status(400)
        } else {
            const {firstName, lastName, email, phoneNumber, password} = req.body
            res.data = UserService.update(req.params.id, {firstName, lastName, email, phoneNumber, password})
            res.status(200)
        }
    } catch (err) {
        res.status(err.code ? err.code : 404)
        res.err = err.message
    } finally {
        next()
    }
    }, responseMiddleware)

router.delete('/:id',(req,res, next)=> {
    try {
        const id = req.params.id
        UserService.delete(id)
        res.status(200)
    } catch (err) {
        res.status(err.code ? err.code : 404)
        res.err = err.message
    } finally {
        next()
    }
}, responseMiddleware)

module.exports = router;