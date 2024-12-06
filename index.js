const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json())

const genres = [
    {id:1, name:'Genre1'},
    {id:2, name:'Genre2'},
    {id:3, name:'Genra3'}
];

app.get('/genres', (req,res)=>res.status(200).send(genres));

app.get('/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id==req.params.id)
    if(!genre) return res.status(404).send('course not found')

    res.status(200).send(genre)
})

app.put('/genres/:id', (req,res)=>{
    const genre = genres.find(g=>g.id==req.params.id)
    if(!genre) return res.status(404).send('course not found')

    const {error} = validateGenre(req.body)
    if(error)return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.status(200).send(req.body)

})

app.post('/genres', (req,res)=>{
    const {error} = validateGenre(req.body)
    if(error)return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length+1,
        name: req.body.name
    }

    genres.push(genre)

    res.status(200).send(genre)

})

app.delete('/genres/:id', (req,res)=>{
    const genre = genres.find(g=>g.id==req.params.id)
    if(!genre) return res.status(404).send('course not found')

    const index = genres.indexOf(genre);
    genres.splice(index,1)

    res.status(200).send(genre)

})



const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}...`))


function validateGenre(genre){
    const schema = Joi.object(
        {name:Joi.string().min(3).required()}
    )

    return schema.validate(genre)
}