# Gestión de Empresas y Transferencias

Este proyecto implementa una aplicación de backend utilizando **Node.js**, **TypeScript**, **Express**, **Mongoose**, y una arquitectura **hexagonal**.

---

## 🧱 Arquitectura

- **Domain Layer**: Entidades, Value Objects y reglas de negocio.
- **Application Layer**: Casos de uso como `AdherirEmpresaService`.
- **Infrastructure Layer**: Conexión con MongoDB usando Mongoose. Controladores y rutas Express.

---

## 🛢️ Base de Datos

La aplicación utiliza MongoDB como base de datos principal. Para su funcionamiento, requiere que esté definido el valor `MONGO_URI` en un archivo `.env`.

Sin embargo, este repositorio ya incluye un `.env` preconfigurado con credenciales de acceso a una base de datos de prueba, lo que permite ejecutar el proyecto sin necesidad de configurar nada adicional.

## 📦 Instalación

```bash
git clone https://github.com/shiberus/empresa-service-hexagonal.git
cd empresa-service-hexagonal
npm install
```

## 🚀 Correr el proyecto

```bash
npm run build
npm start
```
---

## 📚 Documentación de la API

Este proyecto utiliza [Swagger UI](https://swagger.io/tools/swagger-ui/) para documentar y visualizar los endpoints disponibles.

La documentación está disponible automáticamente al iniciar el servidor. Podés acceder desde tu navegador en:

```
http://localhost:3000/api-docs
```

Ahí vas a encontrar todos los endpoints expuestos por la API, incluyendo sus métodos, parámetros, ejemplos y respuestas esperadas.

## 🧪 Testing

Este proyecto utiliza [Jest](https://jestjs.io/) como framework de testing, junto con [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) para pruebas de integración con una base de datos MongoDB en memoria.

Para ejecutar los tests:

```bash
npm test
```

> El proyecto alcanza un **100% de cobertura** en statements, branches, functions y lines.

Además, en `/test/fixtures` se encuentran archivos JSON con los mismos datos que se cargaron en la base de datos.

## 📌 Supuestos / Asunciones

Durante el desarrollo del proyecto se tomaron las siguientes decisiones y supuestos:

- 📅 *Último mes*: Se considera como el período comprendido entre el mismo día del mes anterior y el día actual.
- 🚫 *Fecha futura*: No se permite adherir empresas con una fecha de adhesión futura.
- ⏱ *Fecha por defecto*: Si no se envía una fecha de adhesión, se utiliza la fecha actual como valor por defecto.
- 🔁 *CUIT único*: No se pueden adherir empresas con un CUIT ya existente en el sistema.
- ✂️ *Funcionalidades omitidas*: No se desarrollaron funcionalidades que no fueron estrictamente requeridas, como registrar transferencias, obtener empresas por ID o CUIT, etc.
- 💸 Importe inválido: Una transferencia no puede tener un importe negativo.
- 🆔 Independencia del ID: Para aislar la capa de infraestructura, Empresa cuenta con su propio ID que no depende de la generación automática de MongoDB.
- Los filtros de fecha para las empresas adheridas o con transferencias se aplican internamente en los controladores, seleccionando datos del último mes según lo especificado en el enunciado. No se expone personalización de filtros al usuario, ya que no fue requerido por el desafío.