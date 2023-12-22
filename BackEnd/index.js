const express = require('express')

const app = express()

var bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

const { dbConnect } = require('./Config/dbConnection')

const authRoutes = require('./Routes/authRoutes')

const usersRoutes = require('./Routes/usersRoutes')

const recipesRoutes = require('./Routes/recipesRoutes')

const scheduleRoutes = require('./Routes/scheduleRoutes')

require('dotenv').config()

const cors = require('cors')

const errorHandler = require('./Middleware/errorHandler')

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your desired origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're using cookies or authentication
}

const port = process.env.PORT

dbConnect()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(errorHandler)

// ########################### Routes ##########################
app.use('/api/users', usersRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/recipes', recipesRoutes)

app.use('/api/schedule', scheduleRoutes)

app.use('/api/cart', scheduleRoutes)

// ########################### Health Check ##########################
app.use('/healthcheck', (res, req) => {
  res.status(200).json({ message: 'Health Check Passed' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
