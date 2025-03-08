import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

// Auths
import RouterAdminPrivate     from './components/RouterPrivate/router-admin-private';
import RouterPrivate          from './components/RouterPrivate/router-private';
import RouterCartPrivate      from './components/RouterPrivate/router-cart-private';

// Boostrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import Navbar                 from './components/navbar'
import Footer                 from './components/footer'
import ButtonUp               from './components/btn-up'
import AlertMessage           from './components/alert-message';

// Auth
import { AuthProvider }       from './context/AuthContext';
       
// Views principales           
import Home                   from './views/Home';
import GameList               from './views/Games/GameList';
import GameDetails            from './views/Games/GameDetails';
import PlayPass               from './views/Subscriptions/PlayPass';

// 404 
import PageNotFound           from './views/PageNotFound';

// Formularios de registrarse e iniciar sesión
import LogIn                  from './views/IniciarSesion';
import CreateUser             from './views/auth/CreateUser';
    
// Admin    
import AdminLayout            from './views/layout/AdminLayout';
import AdminDashboard         from './views/Admin/AdminDashboard';
import UsersDashboard         from './views/Admin/UserDashboard';
import AdminUserOrders        from './views/Admin/orders/UserOrders';
import AdminUserOrderDetails  from './views/Admin/orders/UserOrderDetails';

// Juegos 
import GamesDashboard         from './views/Admin/GamesDashboard';
import CreateGame             from './views/Admin/CreateGame';
import EditGame               from './views/Admin/EditGame';

// Suscripciones
import SubscriptionsDashboard from './views/Admin/SubscriptionsDashboard';
import CreateSubscription     from './views/Admin/CreateSubscription';       
import EditSubscription       from './views/Admin/EditSubscription';

// Carrito
import Cart                   from './views/cart/cart';
import Checkout               from './views/Cart/CheckOut';
import Exito                  from './views/Cart/Exito';

// Perfil del usuario
import Profile                from './views/auth/Profile';
import UserOrderDetails       from './views/auth/UserOrderDetails';


function App() {
  const location = useLocation(); 
  const [alert, setAlert] = useState(location.state || { message: '', type: '' });

  useEffect(() => {
    if (location.state) {
      setAlert(location.state); 
    }
  }, [location.state]);  

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/admin/*' element={<RouterAdminPrivate><AdminLayout /></RouterAdminPrivate>}>
            <Route path="panel" element={<AdminDashboard />} />
            <Route path='juegos' element={<GamesDashboard />} />
            <Route path='juegos/crear' element={<CreateGame />} />
            <Route path='juegos/editar/:id' element={<EditGame />} />
            <Route path='suscripciones' element={<SubscriptionsDashboard />} />
            <Route path='suscripciones/crear' element={<CreateSubscription /> } />
            <Route path='suscripciones/editar/:id' element={<EditSubscription />}/>
            <Route path='usuarios' element={<UsersDashboard />}/>
            <Route path='usuario/:id/pedidos' element={<AdminUserOrders />}/>
            <Route path='pedido/:id/detalle' element={<AdminUserOrderDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path='*' element={
            <>
              <Navbar />
              {alert.message && 
                <AlertMessage 
                  message={alert.message} 
                  type={alert.type} 
                  onClose={() => setAlert({ message: '', type: '' })}
                />
              }
              <main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/juegos' element={<GameList />} />
                  <Route path='/juego/:id' element={<GameDetails />} />
                  <Route path='/playpass' element={<PlayPass />} />
                  <Route path='/iniciar-sesion' element={<LogIn />} />
                  <Route path='/crear-cuenta'  element={<CreateUser /> } /> 
                  <Route path='/carrito' element={<Cart />} />
                  <Route path='/finalizar-compra' element={<RouterPrivate><RouterCartPrivate> <Checkout /></RouterCartPrivate></RouterPrivate> } ></Route>
                  <Route path='/exito' element={<RouterPrivate><Exito /></RouterPrivate>}></Route>
                  <Route path='/perfil' element={<RouterPrivate><Profile /></RouterPrivate>}></Route>
                  <Route path='/perfil/pedido/:id' element={<RouterPrivate><UserOrderDetails/> </RouterPrivate> }></Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <ButtonUp />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App
