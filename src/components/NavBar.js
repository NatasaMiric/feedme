import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Avatar from "./Avatar";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  console.log(currentUser)

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedOutIcons = (
    <>
      <NavLink
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  const loggedInIcons = <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed"
    >
      <i className="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink
      activeClassName={styles.Active}
      to="/recipes/create"
    >
      <i className="fas fa-plus-circle"></i>Add Recipe
    </NavLink>
    <NavLink
      to="/bookmarked"
      activeClassName={styles.Active}
    >
      <i className="fas fa-bookmark"></i>Bookmarked
    </NavLink>
    <NavLink
      to="/"
      onClick={handleSignOut}
    >
      <i className="fas fa-sign-out-alt"></i>Sign out
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />            
    </NavLink>
  </>;

  return (
    <Navbar expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" /><span
              className={styles.Brand}>FeedMe</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left" >
            <NavLink to="/"
              exact
              activeClassName={styles.Active}>
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;