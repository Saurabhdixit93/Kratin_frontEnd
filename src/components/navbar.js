import React, { useState } from "react";
import styled from "styled-components";
import { getTokenCookie } from "../context/cookie";
import { message } from "antd";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
`;

const NavbarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${({ mobileNavOpen }) => (mobileNavOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    align-items: center;
    padding: 5px;
    background-color: #333;
    width: 100%;
    z-index: 1;
  }
`;

const NavLinkItem = styled.li`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #007bff;
  }
  .link {
    transition: 0.3s;
    text-decoration: none;
    color: white;
  }
  .link:hover {
    color: #007bff;
  }
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;

  ${NavLinkItem}:hover & {
    display: block;
  }
`;
const HamburgerIcon = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  .bar {
    width: 30px;
    height: 3px;
    background-color: white;
    margin: 3px 0;
    transition: 0.4s;
  }

  &.active {
    .bar:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }
    .bar:nth-child(2) {
      opacity: 0;
    }
    .bar:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
const LogoutButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const Navbar = () => {
  const user = getTokenCookie();

  let email = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    email = tokenPayload.email;
  }
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const handleLogout = (e) => {
    alert("Are you sure to logout");
    try {
      if (user) {
        Cookies.remove("token");
        message.success("Logout Successfull");
        window.location.reload();
        return;
      }
    } catch (error) {
      message.error(error.message);
      return;
    }
  };
  return (
    <NavbarContainer>
      <NavbarInner>
        <Logo>Kratin Healthy</Logo>
        <HamburgerIcon
          className={mobileNavOpen ? "active" : ""}
          onClick={toggleMobileNav}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </HamburgerIcon>
        <NavLinks mobileNavOpen={mobileNavOpen}>
          {user && (
            <NavLinkItem className="dropdown">
              {email} <FontAwesomeIcon icon={faAngleDown} />
              <DropdownMenu>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </DropdownMenu>
            </NavLinkItem>
          )}
          {!user && (
            <NavLinkItem className="dropdown">
              <Link className="link" to={"/login"}>
                Login
              </Link>
            </NavLinkItem>
          )}
        </NavLinks>
      </NavbarInner>
    </NavbarContainer>
  );
};

export default Navbar;
