
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './Pages/Orders';
function App() {
  //routers
  return (
    <div className="App">
      <Router>
        <ToastContainer theme='colored' />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='*' element={<NotFound />} />
        </Routes>


      </Router>
    </div>
  );
}

export default App;
