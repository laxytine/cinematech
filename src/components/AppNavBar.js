import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import logo from "../assets/images/home-logo.png";
import '../assets/css/AppNavBar.css';

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Navbar expand="lg" className="pad navbar-dark bg-gray">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="logo"
            height={60}
            width={60}
            className="img-fluid"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAuthenticated ? (
              isAdmin === "true" ? (
                <>
                  <Nav.Link as={NavLink} to="/movies" exact className="nav-link-gray">
                    Movies
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout" className="nav-link-gray">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/favorites" className="nav-link-gray">
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/movies" exact className="nav-link-gray">
                    Movies
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout" className="nav-link-gray">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/movies" exact className="nav-link-gray">
                  Movies
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="nav-link-gray">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link-gray">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}