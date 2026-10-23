import { useState } from 'react';
import { AlertCircle, Brain, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function AsistenteIA() {
  const [analisis, setAnalisis] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const obtenerAnalisis = async () => {
    if (cargando) return;
    setCargando(true);
    setAnalisis('');
    setError('');
    try {
      const res = await axios.post('/api/analisis-ia');
      const contenido = res.data?.output ?? res.data?.sugerencia ?? res.data;
      const resultado = typeof contenido === 'string'
        ? contenido
        : JSON.stringify(contenido, null, 2);
      if (!resultado) {
        throw new Error('La respuesta del análisis está vacía.');
      }
      setAnalisis(resultado);
    } catch (requestError) {
      console.error('Error al obtener el análisis de IA', requestError);
      setError('No se pudo obtener el análisis. Revisa la conexión con el servicio e inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section aria-labelledby="assistant-page-title">
      <header className="page-heading">
        <div>
          <p className="page-eyebrow"><Sparkles size={15} aria-hidden="true" /> Recomendaciones</p>
          <h1 className="page-title" id="assistant-page-title">Asistente de compras</h1>
          <p className="page-description">Analiza el inventario y recibe sugerencias para planificar el reabastecimiento.</p>
        </div>
      </header>

      <div className="assistant-card surface-card">
        <div className="assistant-card-content">
          <div className="assistant-intro">
            <span className="assistant-icon"><Brain size={28} aria-hidden="true" /></span>
            <div>
              <h2 className="assistant-title">Gerente de compras virtual</h2>
              <p className="assistant-description">Análisis de existencias mediante el servicio de IA conectado.</p>
            </div>
          </div>

          {error && (
            <div className="notice notice-error page-notice" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            className="primary-button"
            onClick={obtenerAnalisis}
            disabled={cargando}
            aria-busy={cargando}
          >
            {cargando ? (
              <><Loader2 size={18} aria-hidden="true" /> Analizando inventario…</>
            ) : (
              <><Sparkles size={17} aria-hidden="true" /> Generar sugerencia de compra</>
            )}
          </button>

          {analisis && (
            <section className="analysis-result" aria-labelledby="analysis-result-title" aria-live="polite">
              <h3 id="analysis-result-title"><Sparkles size={15} aria-hidden="true" /> Recomendación</h3>
              <p>{analisis}</p>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
