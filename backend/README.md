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

### Localmente
```bash
npm run test
```

### Usando Docker (Recomendado)
```bash
# Ejecutar tests en el contenedor del backend
docker exec backend-dev npm test

# Ejecutar tests con output detallado
docker exec -it backend-dev npm test

# Ejecutar tests específicos
docker exec backend-dev npm test -- --grep "PostService"
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
