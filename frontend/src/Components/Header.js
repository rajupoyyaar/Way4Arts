import React from 'react'
import './Header.css'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { logOut } from '../Fetures/ArtistSlice'
import { logOutCustomer } from '../Fetures/CustomerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const {customer} = useSelector((state)=> state.customer)

    const logout = ()=>{
        dispatch(logOut())
        navigation('/artist-login')
    }

    const logoutCustomer = ()=>{
        dispatch(logOutCustomer())
        navigation('/customer-login')
    }

  return (
    <div className='navbar-container'>
        <Navbar expand="lg" className="bg-primary " variant='dark'>
            <Container >
                <Navbar.Brand href="/">Way4Arts</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/">Home</Nav.Link>

                    <NavDropdown title={customer?.name || "Profile"} id="navbarScrollingDropdown">
                        <NavDropdown.Item href='/customer-registration'>
                            Register   
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/customer-login'>
                            Login  
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/track-orders'>
                            Track Orders      
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutCustomer}>
                            Logout 
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Artist" id="navbarScrollingDropdown">
                    <NavDropdown.Item href='/artist-registration'>
                        Enroll  
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/artist-login'>
                       Login 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/upload-art'>
                       Upload Painting
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/artist/manage-orders'>
                       Manage Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                       Logout 
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header   