'use strict'


const express = require('express');
const app = express();



const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
 const logger = require('./middleware/logger');



app.use(express.json());
app.use(logger);

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to TOUR API',
    })
})

// API endpoints
app.use('/api/tours', tourRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Swagger-UI Middleware:
// npm i swagger-ui-express
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger');
// Parse/Run swagger.json and publish on any URL:
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))

// Hata yakalama middleware
app.use(errorMiddleware);

module.exports = app;
