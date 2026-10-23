import { useState } from 'react';
import { Coffee, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

// Productos de ejemplo basados en la tabla 'recetas'
const productos = [
  { id: 1, nombre: 'Café Latte', precio: 3.50 },
  { id: 2, nombre: 'Espresso', precio: 2.00 },
  { id: 3, nombre: 'Capuchino', precio: 3.80 },
  { id: 4, nombre: 'Mocha', precio: 4.20 },
];

export default function PuntoDeVenta() {
  const [mensaje, setMensaje] = useState(null);
  const [procesando, setProcesando] = useState(false);

  const handleVenta = async (producto) => {
    setProcesando(true);
    setMensaje(null);
    try {
      await axios.post('/api/venta', { productoId: producto.id, cantidad: 1 });
      setMensaje({ tipo: 'exito', texto: `¡Venta de ${producto.nombre} registrada con éxito!` });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMensaje({ tipo: 'error', texto: `Stock insuficiente para preparar ${producto.nombre}.` });
      } else {
        setMensaje({ tipo: 'error', texto: 'Error al procesar la venta.' });
      }
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-coffee-brown">Punto de Venta</h2>
        <p className="text-coffee-light mt-1">Selecciona un producto para descontar insumos automáticamente.</p>
      </header>

      {/* Banner de Notificación */}
      {mensaje && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {mensaje.tipo === 'exito' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="font-medium">{mensaje.texto}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <button
            key={prod.id}
            onClick={() => handleVenta(prod)}
            disabled={procesando}
            className="bg-white border-2 border-coffee-beige rounded-xl p-6 flex flex-col items-center gap-4 hover:border-coffee-orange hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="w-16 h-16 bg-coffee-beige rounded-full flex items-center justify-center group-hover:bg-coffee-orange transition-colors">
              <Coffee className="w-8 h-8 text-coffee-brown group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-coffee-brown">{prod.nombre}</h3>
              <p className="text-coffee-orange font-semibold text-xl">${prod.precio.toFixed(2)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}