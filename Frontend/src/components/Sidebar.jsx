import { NavLink } from 'react-router-dom';
import { Coffee, ShoppingCart, Brain, LayoutDashboard } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Inventario' },
  { to: '/ventas', icon: ShoppingCart, label: 'Punto de Venta' },
  { to: '/ia', icon: Brain, label: 'Asistente IA' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-coffee-brown text-coffee-cream flex flex-col shadow-2xl">
      <div className="p-6 flex items-center gap-3 border-b border-coffee-light">
        <Coffee className="w-8 h-8 text-coffee-orange" />
        <h1 className="text-xl font-bold tracking-wide">Café Manager</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-coffee-orange text-white shadow-lg'
                  : 'text-coffee-beige hover:bg-coffee-light hover:text-white'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-coffee-light text-center text-sm text-coffee-beige opacity-70">
        v1.0.0 • Powered by n8n
      </div>
    </aside>
  );
}