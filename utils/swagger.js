const doc = {
  info: {
    title: 'Tur API',
    description: 'Tur Satış Uygulaması için API dokümantasyonu'
  },
  host: 'localhost:8000',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization header using the Bearer scheme.'
    }
  },
  security: [
    {
      Bearer: []
    }
  ]
};
