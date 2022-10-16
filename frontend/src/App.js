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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
