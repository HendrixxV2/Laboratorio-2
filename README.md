# Café Manager

Aplicación React/Vite para gestionar inventario, ventas y recomendaciones de compra. El frontend se comunica con la API Express del backend; el backend lee el inventario desde Supabase y delega ventas y análisis al webhook de n8n.

## Requisitos

- Node.js y npm.
- Un proyecto Supabase con una tabla `insumos` accesible mediante `select`.
- n8n con el webhook configurado para las rutas de venta y análisis.

## Configuración

Instala las dependencias de cada aplicación:

```sh
npm --prefix Frontend install
npm --prefix Backend install
```

Crea `Backend/.env` a partir de `Backend/.env.example` y configura `SUPABASE_URL`, `SUPABASE_KEY` y `N8N_WEBHOOK_URL`. Si el frontend se publica en otro origen, ajusta `FRONTEND_ORIGIN`. No subas `Backend/.env` al repositorio.

## Desarrollo

Desde la raíz del proyecto, ejecuta cada comando en una terminal distinta:

```sh
npm run dev
```

```sh
npm run dev:backend
```

Vite sirve el frontend en el puerto 5173 y reenvía `/api` al backend en el puerto 3000. El backend obtiene el inventario de Supabase; para que las ventas y el análisis funcionen, n8n debe estar disponible en la URL configurada.

## Producción

```sh
npm run build
```

El resultado está en `Frontend/dist`. El servidor que publique el frontend debe reenviar las rutas `/api` al backend; el proxy de Vite solo se usa durante el desarrollo.
