# Cafeter-IA ☕

Una herramienta tranquila para llevar el día a día de una cafetería: revisa existencias, registra bebidas y pide una segunda opinión para planear las compras. La idea es que la operación esté a mano, sin convertir cada tarea en otra cosa que administrar.

## Qué puedes hacer

- **Inventario:** consultar insumos, sus existencias y el nivel mínimo; detectar de un vistazo qué conviene reponer.
- **Punto de venta:** registrar la venta de una bebida. El flujo conectado procesa la operación y descuenta los insumos según la configuración de n8n.
- **Asistente de compras:** solicitar un análisis del inventario y mostrar las sugerencias que devuelve el flujo de IA.
- **Diseño adaptable:** usar las mismas secciones desde escritorio o desde una pantalla pequeña.

## Cómo está armado

El proyecto se divide en dos aplicaciones:

- **Frontend:** React, React Router y Vite. La interfaz vive en `Frontend/src`; Vite sirve el sitio en `http://localhost:5173` y, durante el desarrollo, reenvía `/api` al backend.
- **Backend:** Node.js y Express en `Backend/server.js`. Expone la API del proyecto, consulta Supabase para el inventario y envía ventas y solicitudes de análisis al webhook de n8n.
- **Datos y automatizaciones:** Supabase proporciona la tabla `insumos`. n8n recibe las acciones `procesar_venta` y `analisis_ia_stock` en el webhook configurado.

Las rutas disponibles son:

| Método | Ruta | Para qué sirve |
| --- | --- | --- |
| `GET` | `/api/insumos` | Lee los insumos desde Supabase. |
| `POST` | `/api/venta` | Envía `productoId` y `cantidad` al flujo de venta de n8n. |
| `POST` | `/api/analisis-ia` | Solicita a n8n un análisis de existencias. |

La pantalla de inventario utiliza los campos `id`, `nombre`, `stock_actual` y `stock_minimo` de cada insumo. El flujo de n8n debe conocer los productos del punto de venta y cómo sus ventas afectan a esos insumos.

## Lo que necesitas

- Node.js y npm.
- Un proyecto de Supabase con una tabla `insumos` y permisos de lectura para la clave que use el backend.
- Un webhook de n8n accesible para procesar ventas y generar análisis.

## Preparar el entorno

Instala las dependencias de las dos aplicaciones desde la raíz:

```sh
npm --prefix Frontend install
npm --prefix Backend install
```

Copia `Backend/.env.example` como `Backend/.env` y completa estos valores:

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto del servidor Express (por defecto, `3000`). |
| `FRONTEND_ORIGIN` | Origen permitido por CORS (por defecto, `http://localhost:5173`). |
| `SUPABASE_URL` | URL del proyecto de Supabase. |
| `SUPABASE_KEY` | Clave de Supabase que utilizará el backend. |
| `N8N_WEBHOOK_URL` | URL del webhook de n8n para ventas y análisis. |

Mantén las claves en `Backend/.env`; no las incluyas en el frontend ni las subas al repositorio.

## Un café en local

Abre dos terminales en la raíz del proyecto. En la primera:

```sh
npm run dev:backend
```

Y en la segunda:

```sh
npm run dev
```

Visita `http://localhost:5173`. El inventario necesita Supabase; las ventas y las recomendaciones necesitan que el webhook de n8n esté disponible. Si algo no responde, revisa primero esas conexiones y los valores del archivo de entorno.

## Compilar y revisar

```sh
npm run build
npm run lint
```

La compilación del frontend queda en `Frontend/dist`. En producción, configura el servidor que publica el frontend para enviar las rutas `/api` al backend; el proxy de Vite solo aplica durante el desarrollo. El backend se puede iniciar con `npm --prefix Backend start`.

## Estructura

```text
Backend/
  server.js             API Express e integraciones con Supabase y n8n
  .env.example          Plantilla de configuración local
Frontend/
  src/
    components/         Navegación compartida
    pages/              Inventario, punto de venta y asistente
    App.jsx             Estructura y rutas de la aplicación
    index.css           Estilos globales y diseño adaptable
  vite.config.js        Servidor de desarrollo y proxy de la API
```

Que el café fluya; del resto, se encarga una lista clara y un buen flujo de trabajo. ☕
