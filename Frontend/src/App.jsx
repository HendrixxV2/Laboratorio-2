import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Inventario from './pages/Inventario';
import PuntoDeVenta from './pages/PuntoDeVenta';
import AsistenteIA from './pages/AsistenteIA';

function App() {
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    let frame = 0;
    const updatePointer = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        shell.style.setProperty('--pointer-x', `${event.clientX - window.innerWidth / 2}px`);
        shell.style.setProperty('--pointer-y', `${event.clientY - window.innerHeight / 2}px`);
      });
    };
    const updateScroll = () => {
      shell.style.setProperty('--scroll-offset', `${window.scrollY * 0.08}px`);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', updateScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="app-shell" ref={shellRef}>
      <div className="ambient-backdrop" aria-hidden="true">
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-bubble bubble-one" />
        <span className="ambient-bubble bubble-two" />
        <span className="ambient-bubble bubble-three" />
      </div>
      <Sidebar />
      <main className="main-area">
        <div className="topbar">
          <div className="topbar-kicker">
            <span className="topbar-dot" aria-hidden="true" />
            Gestión de cafetería
          </div>
          <span className="topbar-label"><Coffee size={14} aria-hidden="true" /> Café Manager</span>
        </div>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Inventario />} />
            <Route path="/ventas" element={<PuntoDeVenta />} />
            <Route path="/ia" element={<AsistenteIA />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
