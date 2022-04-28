import React from "react";
import styled from 'styled-components'


const Navbar = () => {
    return (
        <Wrapper>
            <NavBar>
                <a href="./">FACEEEE.AI</a>
                </NavBar>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const NavBar = styled.div`
  margin: 0px;
  height: 60px;
  background-color: #1b74e4;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  padding: 0px 100px;
  font-size: 26px;

  a {
      text-decoration: none;
      color: white;
  }
`
export default Navbar;