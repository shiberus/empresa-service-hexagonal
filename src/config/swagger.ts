import { Options } from 'swagger-jsdoc';
import { components } from '../docs/components';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Empresas API',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de empresas y transferencias',
    },
    components,
  },
  apis: ['src/infrastructure/web/routes/*.ts'],
};

export default swaggerOptions;
