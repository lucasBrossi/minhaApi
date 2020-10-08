const express = require('express')
const assert = require('assert')
const { join } = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'dev'
assert.ok(env === "dev" || env === "prod", "Esta variavel de ambiente não está correta")
const configPath = join(__dirname, "../configs", `.env.${env}`)

dotenv.config({
    path: configPath
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.json({
        "success": true
    })
})

app.get(`/usuario`, (req, res) => {
    const nome = req.query.nome

    res.json({
        "success": true,
        "nome": nome
    })
})

app.get('/usuario/:usuario', (req, res) => {
    const usuario = req.params.usuario

    res.json({
        "success": true,
        "usuario": usuario
    })
})

app.get('/lista', (req, res) => {
    res.status(404).json({
        "error": "deu merda"
    })
})

app.listen(process.env.PORT, () => console.log(`Este servidor esta rodando na porta ${process.env.PORT}`))