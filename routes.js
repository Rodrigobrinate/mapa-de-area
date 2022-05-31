const express = require('express')
const router = express.Router()
const IndexController = require('./controllers/Index.controller')
const LoginController = require('./controllers/Login.controller')
const RegisterController = require('./controllers/Register.controller')
const MassiveController = require('./controllers/Massive.controller')
const CofeeController = require('./controllers/Cofee.controller')
const verifyJWT = require('./middleware/jwtVerify')
const jwtVerify = require('./middleware/jwtVerify')

router.get('/', IndexController.index)
router.post('/login', LoginController.login)
router.post('/register', RegisterController.register)
router.get('/city', IndexController.city)
router.get('/colaborator', IndexController.colaborator)
router.post('/create', verifyJWT, IndexController.create)
router.post('/search', IndexController.search)
router.get('/teste', jwtVerify, IndexController.teste)
router.post('/delete', jwtVerify, IndexController.delete)
router.post('/createMassive', jwtVerify, MassiveController.createMassive)
router.get('/Massive', MassiveController.massive)
router.get('/coffee', CofeeController.index)
router.get('/addCoffee',jwtVerify, CofeeController.create) 
router.get('/closeCofee',jwtVerify, CofeeController.delete)
router.post('/createMassiveClient', jwtVerify, MassiveController.createClientMassive)
router.get('/clientMassive', MassiveController.clientMassiveview)



router.get('/t', jwtVerify, (req, res) => {
    res.json(req.user)
})
module.exports = router 