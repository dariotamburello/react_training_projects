import express, { json } from 'express'
// import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => { 
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by') 
    
    app.get('/', (req, res) => {
        res.json({message: 'welcome'})
    })
    
    app.use('/movies', createMovieRouter({ movieModel }))
    
    const PORT = process.env.port ?? 9900
    
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`)
    })
}