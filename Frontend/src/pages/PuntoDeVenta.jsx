import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Coffee, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const productos = [
  { id: 1, nombre: 'Café Latte', precio: 3.50 },
  { id: 2, nombre: 'Espresso', precio: 2.00 },
  { id: 3, nombre: 'Capuchino', precio: 3.80 },
  { id: 4, nombre: 'Mocha', precio: 4.20 },
];

export default function PuntoDeVenta() {
  const [mensaje, setMensaje] = useState(null);
  const [productoProcesando, setProductoProcesando] = useState(null);

  const handleVenta = async (producto) => {
    if (productoProcesando !== null) return;
    setProductoProcesando(producto.id);
    setMensaje(null);
    try {
      await axios.post('/api/venta', { productoId: producto.id, cantidad: 1 });
      setMensaje({ tipo: 'exito', texto: `¡Venta de ${producto.nombre} registrada con éxito!` });
    } catch (error) {
      if (error.response?.status === 409) {
        setMensaje({ tipo: 'error', texto: `Stock insuficiente para preparar ${producto.nombre}.` });
      } else {
        console.error('Error al procesar la venta', error);
        setMensaje({ tipo: 'error', texto: 'No se pudo registrar la venta. Comprueba la conexión e inténtalo de nuevo.' });
      }
    } finally {
      setProductoProcesando(null);
    }
  };

  return (
    <section aria-labelledby="sales-title">
      <header className="page-heading">
        <div>
          <p className="page-eyebrow"><ShoppingBag size={15} aria-hidden="true" /> Atención al cliente</p>
          <h1 className="page-title" id="sales-title">Punto de venta</h1>
          <p className="page-description">Selecciona una bebida para registrar la venta y descontar sus insumos.</p>
        </div>
      </header>

      {mensaje && (
        <div
          className={`notice page-notice ${mensaje.tipo === 'exito' ? 'notice-success' : 'notice-error'}`}
          role={mensaje.tipo === 'exito' ? 'status' : 'alert'}
          aria-live={mensaje.tipo === 'exito' ? 'polite' : 'assertive'}
        >
          {mensaje.tipo === 'exito' ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
          <span>{mensaje.texto}</span>
        </div>
      )}

      <div className="product-grid">
        {productos.map((producto) => {
          const procesando = productoProcesando === producto.id;
          return (
            <button
              key={producto.id}
              type="button"
              onClick={() => handleVenta(producto)}
              disabled={productoProcesando !== null}
              aria-label={`Registrar venta de ${producto.nombre}, $${producto.precio.toFixed(2)}`}
              className="product-card"
            >
              <span className="product-card-icon"><Coffee size={25} strokeWidth={1.9} aria-hidden="true" /></span>
              <span className="product-card-name">{producto.nombre}</span>
              <span className="product-card-price">${producto.precio.toFixed(2)}</span>
              <span className="product-action">
                {procesando ? 'Registrando venta…' : 'Registrar venta'}
                {procesando ? <span aria-hidden="true">…</span> : <ArrowUpRight size={15} aria-hidden="true" />}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
