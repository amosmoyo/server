import React, { useState, useEffect } from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Dropdown,
  Container,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/index";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [userLog, setUserLog] = useState(true);

  const { isLogged, user } = useSelector((state) => state.authReducers);

  useEffect(() => {}, [isLogged, user]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            Emaily
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav> */}

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">Emaily</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {isLogged ? (
                <>
                  <NavDropdown
                    // title={userData.userInfo.email.toLowerCase()}
                    title={
                      <Image
                        src={user.avatar}
                        alt="UserName profile image"
                        roundedCircle
                        style={{ width: "40px", height: "40px" }}
                      />
                    }
                  >
                    <LinkContainer to="/account">
                      <Dropdown.Item>DashBoard</Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </NavDropdown>

                  {/* <LinkContainer to="/account">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <Nav.Link eventKey={2} onClick={handleLogout}>
                    Logout
                  </Nav.Link> */}
                </>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
