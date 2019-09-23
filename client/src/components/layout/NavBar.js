import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import Button from 'react-bootstrap/Button';


const NavBar = () => {
  return (
    <div>
     
      
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ul
        className='navbar-nav  sidebar sidebar-dark accordion accordionSidebar'
        id='accordionSidebar'
      >
        <a
          className='sidebar-brand d-flex align-items-center justify-content-center'
          href='!#'
        >
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>ChainBizz</div>
        </a>

        <hr className='sidebar-divider my-0' />

        <li className='nav-item active'>
          <a className='nav-link' href='index.html'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className='nav-item'>
          <a className='nav-link' href='index.html'>
            <i className='fas fa-fw fa-folder'></i>
            <span>My projects</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='index.html'>
            <i className='fas fa-fw fa-folder'></i>
            <span>My contracts</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
