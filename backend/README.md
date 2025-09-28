# Backend - API Test Log

API RESTful desarrollada con Node.js, TypeScript y Express.

## Tecnologías principales
- Node.js >= 18.x
- TypeScript
- Express
- ESLint
- Docker

## Instalación

```bash
# Instalar dependencias
npm install
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Usando Docker
```bash
docker build -t api-test-log-backend .
docker run -p 3000:3000 api-test-log-backend
```

## Tests

```bash
npm run test
```

## Estructura principal
```
backend/
├── src/
│   ├── application/
│   ├── config/
│   ├── domain/
│   ├── infrastructure/
│   ├── interface/
│   └── index.ts
├── test/
├── package.json
└── Dockerfile
```

## Navegación
- [Volver a la raíz](../README.md)
- [Ir al frontend](../frontend/README.md)
