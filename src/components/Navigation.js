import React from 'react'
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../components/images/taskLogo.png'
import { useAuth } from '../contexts/AuthContext'
import '../components/Auth/Auth.css'
import { useNavigate } from 'react-router-dom'
import Profile from './Auth/Profile'

export default function Navigation() {
    const { currentUser, logout } = useAuth()

    
    // const profilePic = <Image src={currentUser.photoURL} alt={currentUser.displayName} roundedCircle style={{ width: '40px' }} />

    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }

    return (
        <Navbar bg='light' expand='md' className='p-3'>
            <Navbar.Brand href='/'>
                <img alt='logo' src={logo} width='30' height='30' className='d-inline-block align-top' /> DoItNow+
            </Navbar.Brand>
            {/* Hamburger Button */}
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <Link to='/home' className='nav-link'>
                        Home
                    </Link>
                    <Link to='/categories' className='nav-link'>
                        Categories
                    </Link>
                    <Link to='/tasks' className='nav-link'>
                        Tasks
                    </Link>
                    {!currentUser && (
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                    )}
                    {currentUser && (
                        <NavDropdown title={<Profile />} align='end' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='#' disabled>Hello {currentUser.displayName}!</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='text-center text-danger' onClick={() => handleAuth()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
