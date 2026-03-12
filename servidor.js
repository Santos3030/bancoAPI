const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())

let datos = JSON.parse(fs.readFileSync("./bancos.json","utf8"))


app.get("/",(req,res)=>{
    res.json(datos.bancos)
})

app.get("/banco",(req,res)=>{
    res.json(nombres = datos.bancos.map(b => b.nombre))
})

app.get("/banco/:id",(req,res)=>{
    let banco = datos.bancos.find(b => b.id == req.params.id)
    res.json(banco)
})


app.get("/banco/:id/personas",(req,res)=>{
    let banco = datos.bancos.find(b => b.id == req.params.id)
    res.json(banco.personas)
})


app.post("/banco",(req,res)=>{
    let nuevo = {
        id: datos.bancos.length + 1,
        nombre: req.body.nombre,
        personas:[]
    }

    datos.bancos.push(nuevo)
    res.json(nuevo)
})


app.post("/banco/:id/personas",(req,res)=>{
    let banco = datos.bancos.find(b => b.id == req.params.id)

    let nuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        estado:"activo"
    }

    banco.personas.push(nuevo)

    res.json(nuevo)
})


app.put("/banco/:id/persona/:pid",(req,res)=>{
    let banco = datos.bancos.find(b => b.id == req.params.id)
    let persona = banco.personas.find(p => p.id == req.params.pid)

    persona.estado = req.body.estado
    res.json(persona)
})




app.delete("/banco/:id/persona/:pid",(req,res)=>{
    let banco = datos.bancos.find(b => b.id == req.params.id)

    banco.personas = banco.personas.filter(p => p.id != req.params.pid)

    res.json({mensaje:"eliminado"})
})


app.listen(3000,()=>{
    console.log("http://localhost:3000")

})
