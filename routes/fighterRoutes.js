const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req,res, next) => {
    try {
        res.data = FighterService.getAllFighters()
        res.status(200)
    } catch (err) {
        res.status(404)
        res.err = err.message
    } finally {
        next()
    }

}, responseMiddleware)

router.get('/:id', (req,res, next) => {
    try {
        res.data = FighterService.getOne(req.params.id)
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


router.post('/', createFighterValid, (req,res, next) => {
    try {
        if (res.err) {
            res.status(400)
        } else {
            let {name, health, power, defense} = req.body
            res.data = FighterService.saveNewFighter({name, health, power, defense})
            res.status(201)
        }
    } catch (err) {
        res.err = err.message
        res.status(err.code ? err.code : 404)
    } finally {
        next()
    }
}, responseMiddleware)

router.put('/:id', updateFighterValid, (req,res, next)=> {
    try {
        if (res.err) {
            res.status(400)
        } else {
            let {name, health, power, defense} = req.body
            res.data = FighterService.update(req.params.id, {name, health, power, defense})
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
        FighterService.delete(req.params.id)
        res.status(200)
    } catch (err) {
        res.status(err.code ? err.code : 404)
        res.err = err.message
    } finally {
        next()
    }
}, responseMiddleware)


module.exports = router;