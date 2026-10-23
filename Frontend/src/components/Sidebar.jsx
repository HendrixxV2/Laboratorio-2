import { NavLink } from 'react-router-dom';
import { Coffee, ShoppingCart, Brain, LayoutDashboard, Leaf } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Inventario' },
  { to: '/ventas', icon: ShoppingCart, label: 'Punto de venta' },
  { to: '/ia', icon: Brain, label: 'Asistente IA' },
];

function NavigationLinks() {
  return links.map(({ to, icon: Icon, label }) => (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      className="nav-link"
    >
      <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
      <span className="nav-link-label">{label}</span>
    </NavLink>
  ));
}

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar" aria-label="Navegación principal">
        <div className="brand">
          <span className="brand-mark"><Coffee size={25} strokeWidth={2} aria-hidden="true" /></span>
          <div>
            <p className="brand-title">Café Manager</p>
            <p className="brand-subtitle">Tu café, en orden</p>
          </div>
        </div>

        <nav aria-label="Secciones">
          <p className="nav-caption">Espacio de trabajo</p>
          <div className="nav-list"><NavigationLinks /></div>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <Leaf size={17} aria-hidden="true" />
            <p>Un espacio sencillo para cuidar cada detalle de tu cafetería.</p>
          </div>
          <p className="sidebar-version">Café Manager · v1.0.0</p>
        </div>
      </aside>
      <nav className="mobile-nav" aria-label="Navegación principal">
        <NavigationLinks />
      </nav>
    </>
  );
}
