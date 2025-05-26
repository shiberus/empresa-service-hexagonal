# Gestión de Empresas y Transferencias

Este proyecto implementa una aplicación de backend utilizando **Node.js**, **TypeScript**, **Express**, **Mongoose**, y una arquitectura **hexagonal**.

---

## 🧱 Arquitectura

- **Domain Layer**: Entidades, Value Objects y reglas de negocio.
- **Application Layer**: Casos de uso como `AdherirEmpresaService`.
- **Infrastructure Layer**: Conexión con MongoDB usando Mongoose.
- **Interface Layer**: Controladores y rutas Express.

---

## 📦 Instalación

```bash
git clone https://github.com/shiberus/empresa-service-hexagonal.git
cd tu-repo
npm install
```

## 🚀 Correr el proyecto

```bash
npm run build
npm start
```
---
## 🎭 mocks

En la carpeta /test/fixtures se incluye un archivo JSON con los mismos datos utilizados para poblar la base de datos. Esto permite ejecutar pruebas o revisar el formato esperado sin necesidad de acceder directamente a la base.

## 📌 Supuestos / Asunciones

Durante el desarrollo del proyecto se tomaron las siguientes decisiones y supuestos:

- 📅 *Último mes*: Se considera como el período comprendido entre el mismo día del mes anterior y el día actual.
- 🚫 *Fecha futura*: No se permite adherir empresas con una fecha de adhesión futura.
- ⏱ *Fecha por defecto*: Si no se envía una fecha de adhesión, se utiliza la fecha actual como valor por defecto.
- 🔁 *CUIT único*: No se pueden adherir empresas con un CUIT ya existente en el sistema.
- ✂️ *Funcionalidades omitidas*: No se desarrollaron funcionalidades que no fueron estrictamente requeridas, como registrar transferencias, obtener empresas por ID o CUIT, etc.
- 💸 Importe inválido: Una transferencia no puede tener un importe negativo.
- 🆔 Independencia del ID: Para aislar la capa de infraestructura, Empresa cuenta con su propio ID que no depende de la generación automática de MongoDB.