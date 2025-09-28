# Frontend - API Test Log

Aplicación web desarrollada con React, Vite y TypeScript.

## Tecnologías principales
- React
- Vite
- TypeScript
- TailwindCSS
- Jest
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
npm run preview
```

### Usando Docker
```bash
docker build -t api-test-log-frontend .
docker run -p 5173:80 api-test-log-frontend
```

## Tests

```bash
npm run test
```

## Estructura principal
```
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── main.tsx
├── __tests__/
├── package.json
└── Dockerfile
```

## Navegación
- [Volver a la raíz](../README.md)
- [Ir al backend](../backend/README.md)
