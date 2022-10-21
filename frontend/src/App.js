// styles
import './App.css';

// components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ProductDetails from './pages/product/ProductDetails';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/payment/Payment';
import PlaceOrder from './pages/placeorder/PlaceOrder';
import Order from './pages/order/Order';
import UsersList from './pages/userslist/UsersList';
import ProductsList from './pages/productslist/ProductsList';
import OrdersList from './pages/orderslist/OrdersList';
import EditUser from './pages/edituser/EditUser';

// hooks
import { useTheme } from './hooks/useTheme';
import { useSelector } from 'react-redux';

function App() {
  const { mode } = useTheme();
  const { user } = useSelector(state => state.login);
 
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!user ? <Login /> : <Home />} />
          <Route path='/signup' element={!user ? <Signup /> : <Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/profile' element={user ? <Profile /> : <Login />} />
          <Route path='/shipping' element={user ? <Shipping /> : <Login />} />
          <Route path='/payment' element={user ? <Payment /> : <Login />} />
          <Route path='/placeorder' element={user ? <PlaceOrder /> : <Login />} />
          <Route path='/order/:id' element={user ? <Order /> : <Login />} />
          <Route path='/admin/users' element={user && user.isAdmin ? <UsersList /> : <Home />} />
          <Route path='/admin/products' element={user && user.isAdmin ? <ProductsList /> : <Home />} />
          <Route path='/admin/orders' element={user && user.isAdmin ? <OrdersList /> : <Home />} />
          <Route path='/admin/users/:id' element={user && user.isAdmin ? <EditUser /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
