import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, Check, Package, RefreshCw } from 'lucide-react';
import axios from 'axios';

async function solicitarInsumos() {
  const res = await axios.get('/api/insumos');
  if (!Array.isArray(res.data)) {
    throw new Error('La respuesta del inventario no tiene el formato esperado.');
  }
  return res.data;
}

export default function Inventario() {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarInsumos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setInsumos(await solicitarInsumos());
    } catch (requestError) {
      console.error('Error al cargar inventario', requestError);
      setError('No se pudo cargar el inventario. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let vigente = true;
    solicitarInsumos()
      .then((data) => {
        if (vigente) setInsumos(data);
      })
      .catch((requestError) => {
        console.error('Error al cargar inventario', requestError);
        if (vigente) setError('No se pudo cargar el inventario. Revisa tu conexión e inténtalo de nuevo.');
      })
      .finally(() => {
        if (vigente) setLoading(false);
      });
    return () => {
      vigente = false;
    };
  }, []);

  const insumosBajos = insumos.filter((insumo) => Number(insumo.stock_actual) <= Number(insumo.stock_minimo)).length;

  return (
    <section aria-labelledby="inventory-title">
      <header className="page-heading">
        <div>
          <p className="page-eyebrow"><Package size={15} aria-hidden="true" /> Control de existencias</p>
          <h1 className="page-title" id="inventory-title">Estado del inventario</h1>
          <p className="page-description">Consulta tus insumos y detecta a tiempo lo que necesita reabastecimiento.</p>
        </div>
        <button className="text-button" type="button" onClick={cargarInsumos} disabled={loading}>
          <RefreshCw size={15} aria-hidden="true" />
          {loading ? 'Actualizando' : 'Actualizar'}
        </button>
      </header>

      {error && (
        <div className="notice notice-error page-notice" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
          <button className="text-button" type="button" onClick={cargarInsumos} disabled={loading}>
            Reintentar
          </button>
        </div>
      )}

      {!error && !loading && insumos.length > 0 && (
        <div className="inventory-summary" aria-live="polite">
          <span className="summary-count"><strong>{insumos.length}</strong> {insumos.length === 1 ? 'insumo registrado' : 'insumos registrados'}</span>
          <span className="summary-count">
            {insumosBajos > 0 ? <AlertTriangle size={14} aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
            <strong>{insumosBajos}</strong> por reabastecer
          </span>
        </div>
      )}

      {loading ? (
        <div className="loading-state" role="status" aria-live="polite">
          <RefreshCw size={23} aria-hidden="true" />
          <p>Cargando inventario…</p>
        </div>
      ) : error ? null : insumos.length === 0 ? (
        <div className="empty-state" role="status">
          <span className="empty-state-icon"><Package size={23} aria-hidden="true" /></span>
          <h3>Aún no hay insumos</h3>
          <p>Cuando haya insumos registrados, aparecerán aquí con su nivel de existencias.</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {insumos.map((insumo) => {
            const cantidad = Number(insumo.stock_actual);
            const minimo = Number(insumo.stock_minimo);
            const stockActual = Number.isFinite(cantidad) ? cantidad : 0;
            const stockMinimo = Number.isFinite(minimo) ? minimo : 0;
            const esBajo = stockActual <= stockMinimo;
            const porcentaje = stockMinimo > 0
              ? Math.max(0, Math.min((stockActual / stockMinimo) * 100, 100))
              : stockActual > 0 ? 100 : 0;
            const nombre = insumo.nombre || 'Insumo sin nombre';

            return (
              <article key={insumo.id} className={`inventory-card surface-card${esBajo ? ' is-low' : ''}`}>
                <div className="inventory-card-top">
                  <div>
                    <h2 className="inventory-name">{nombre}</h2>
                    <p className="inventory-minimum">Mínimo: {insumo.stock_minimo}</p>
                  </div>
                  <span className="inventory-icon"><Package size={20} aria-hidden="true" /></span>
                </div>
                <div className="inventory-quantity">
                  <strong>{insumo.stock_actual}</strong>
                  <span>unidades</span>
                </div>
                <div
                  className="stock-track"
                  role="progressbar"
                  aria-label={`Nivel de stock de ${nombre}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(porcentaje)}
                >
                  <div className="stock-fill" style={{ width: `${porcentaje}%` }} />
                </div>
                <div className="stock-status">
                  {esBajo ? (
                    <><AlertTriangle size={14} aria-hidden="true" /> Stock en el mínimo o por debajo</>
                  ) : (
                    <><Check size={14} aria-hidden="true" /> Existencias por encima del mínimo</>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
