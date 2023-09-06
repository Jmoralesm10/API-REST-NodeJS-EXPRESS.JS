import express from "express";
import personalRoutes from './routes/Personal.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',personalRoutes)

app.use ((req, res, next) => {
    res.status(404).json({
        message: 'EndPoint no encontrado'
    })
})

app.listen(3000)
console.log('Server running on port 3000')