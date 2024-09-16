'use strict'


const express = require('express');
const app = express();



const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
 const logger = require('./middleware/logger');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./utils/swagger');

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
// app.use('/api/categories', categoryRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Hata yakalama middleware
app.use(errorMiddleware);

module.exports = app;
