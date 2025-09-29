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

### Localmente
```bash
npm run test
```

### Usando Docker (Recomendado)
```bash
# Ejecutar tests en el contenedor del frontend
docker exec frontend-dev npm test

# Ejecutar tests con modo interactivo
docker exec -it frontend-dev npm test

# Ejecutar tests específicos
docker exec frontend-dev npm test -- SearchInput.test.tsx

# Ejecutar tests con cobertura (si está configurado)
docker exec frontend-dev npm run test:coverage
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
