import { useEffect, useState } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function Inventario() {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const res = await axios.get('/api/insumos');
        setInsumos(res.data);
      } catch (error) {
        console.error("Error al cargar inventario", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsumos();
  }, []);

  if (loading) return <div className="text-coffee-brown text-lg animate-pulse">Cargando inventario...</div>;

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-coffee-brown">Estado del Inventario</h2>
        <p className="text-coffee-light mt-1">Monitoreo en tiempo real de insumos y materia prima.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insumos.map((insumo) => {
          const porcentaje = (insumo.stock_actual / insumo.stock_minimo) * 100;
          const esBajo = insumo.stock_actual <= insumo.stock_minimo;

          return (
            <div key={insumo.id} className={`p-6 rounded-xl shadow-md border transition-transform hover:scale-[1.02] ${
              esBajo ? 'bg-red-50 border-red-200' : 'bg-white border-coffee-beige'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-coffee-brown capitalize">{insumo.nombre}</h3>
                  <p className="text-sm text-coffee-light">Stock Mínimo: {insumo.stock_minimo}</p>
                </div>
                <Package className={`w-6 h-6 ${esBajo ? 'text-red-500' : 'text-coffee-orange'}`} />
              </div>

              <div className="mb-2">
                <span className={`text-3xl font-bold ${esBajo ? 'text-red-600' : 'text-coffee-brown'}`}>
                  {insumo.stock_actual}
                </span>
                <span className="text-sm text-coffee-light ml-2">unidades</span>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-coffee-beige rounded-full h-2.5 mt-4">
                <div 
                  className={`h-2.5 rounded-full ${esBajo ? 'bg-red-500' : 'bg-coffee-orange'}`} 
                  style={{ width: `${Math.min(porcentaje, 100)}%` }}
                ></div>
              </div>
              
              {esBajo && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Stock por debajo del mínimo
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}