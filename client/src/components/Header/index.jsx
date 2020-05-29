import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import colors from "../Reusable/colors";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: fixed;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const Logo = styled(Link)`
  padding: 5px;
  color: ${({color}) => color ? color : 'black'};
  transition: 0.2s;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: ${({hlColor}) => hlColor ? hlColor : 'gray'};
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '0.01',
    }
  }

  render () {
    const {
      version, 
    } = this.state;

    return (
      <Wrapper> 
        <Logo сolor={colors.color_text} hlColor={colors.color_main_hl}>{`Adventurer v${version}`}</Logo>    
      </Wrapper>
    )
  }
}

export default withRouter(Header);