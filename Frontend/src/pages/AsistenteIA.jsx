import { useState } from 'react';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function AsistenteIA() {
  const [analisis, setAnalisis] = useState('');
  const [cargando, setCargando] = useState(false);

  const obtenerAnalisis = async () => {
    setCargando(true);
    setAnalisis('');
    try {
      const res = await axios.post('/api/analisis-ia');
      // Asumimos que n8n/DeepSeek devuelve un objeto con la propiedad 'output' o 'sugerencia'
      // Ajusta 'res.data.output' según la estructura exacta que devuelva tu agente n8n
      setAnalisis(res.data.output || res.data.sugerencia || JSON.stringify(res.data, null, 2));
    } catch (error) {
      setAnalisis('Error al obtener el análisis. Verifica la conexión con n8n.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-coffee-brown">Asistente de Compras (IA)</h2>
        <p className="text-coffee-light mt-1">Deja que DeepSeek analice tu inventario y sugiera reabastecimientos.</p>
      </header>

      <div className="bg-white rounded-xl shadow-lg border border-coffee-beige p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-coffee-orange rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-coffee-brown">Gerente de Compras Virtual</h3>
            <p className="text-coffee-light text-sm">Impulsado por DeepSeek</p>
          </div>
        </div>

        <button
          onClick={obtenerAnalisis}
          disabled={cargando}
          className="w-full sm:w-auto px-6 py-3 bg-coffee-brown text-white font-semibold rounded-lg hover:bg-coffee-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {cargando ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analizando Inventario...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Sugerencia de Compra
            </>
          )}
        </button>

        {analisis && (
          <div className="mt-8 p-6 bg-coffee-cream rounded-lg border-l-4 border-coffee-orange">
            <h4 className="font-bold text-coffee-brown mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coffee-orange" />
              Recomendación de la IA:
            </h4>
            <p className="text-coffee-brown whitespace-pre-wrap leading-relaxed">
              {analisis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}