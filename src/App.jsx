import { useLocation, useRoutes } from 'react-router-dom';
import { routes } from './routing/route.jsx';
import './App.css';
import { useEffect } from 'react';

function App() {
  const routing = useRoutes(routes);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/signin' && location.pathname !== '/signup') {
      window.location = '/signin';
    }
  }, [location.pathname])

  return routing;
}

export default App;
