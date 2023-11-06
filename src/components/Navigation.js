import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../components/images/taskLogo.png'

export default function Navigation() {
  return (
    <Navbar bg='light' expand='md' className='p-3'>
      <Navbar.Brand href='/'>
      <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
        DoItNow+</Navbar.Brand>
      {/* Hamburger Button */}
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav>
          <Link to='/home' className='nav-link'>Home</Link>
          <Link to='/login' className='nav-link'>Login</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
