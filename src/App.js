import './App.css';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AuthProvider from './contexts/AuthContext';
import Login from './components/Auth/Login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
