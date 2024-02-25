import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar variant="dark" expand="lg" collapseOnSelect style={{ backgroundColor: '#485785', padding: '30px' }}>
                <Container>
                    <LinkContainer to='/'>
                        <h1><Navbar.Brand style={{ fontSize: '40px', color: '#fff' }}>NESTQUEST</Navbar.Brand></h1>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ fontSize: '18px' }}>
                            {userInfo ? (
                                <h3><NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/create'>
                                        <NavDropdown.Item>Make an offer</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/offerlist'>
                                        <NavDropdown.Item>My offers</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/requests'>
                                        <NavDropdown.Item>All Requests</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                </NavDropdown></h3>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                        <SearchBox />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
