import './App.css';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Categories from './components/Categories/Categories'
import Task from './components/Task/Task'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/categories' element=
            {<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/tasks' element=
            {<ProtectedRoute><Task /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
