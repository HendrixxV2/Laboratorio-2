import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Inventario from './pages/Inventario';
import PuntoDeVenta from './pages/PuntoDeVenta';
import AsistenteIA from './pages/AsistenteIA';

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route path="/" element={<Inventario />} />
          <Route path="/ventas" element={<PuntoDeVenta />} />
          <Route path="/ia" element={<AsistenteIA />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;