// styles
import './App.css';

// components
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ProductDetails from './pages/product/ProductDetails';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';

// hooks
import { useTheme } from './hooks/useTheme';


function App() {
  const { mode } = useTheme()
 
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
