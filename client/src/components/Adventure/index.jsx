import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import colors from "../Reusable/colors";

const Wrapper = styled.div`
  width: 200px;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  z-index: ${({visible}) => !visible ? '9998' : '10000'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
`;

const Logo = styled.div`
  padding: 10px;
  font-size: 20px;
  color: white;
  width: 100%;
  text-align: center;
`;

const MobileMenuButton = styled.div`
  position: fixed;
  cursor: pointer;
  top: 0px;
  left: 0px;
  z-index: ${({visible}) => !visible ? '9998' : '10000'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  height: 50px;
  width: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  box-shadow: ${({visible}) => !visible ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 'none'};
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: ${({visible}) => !visible ? '0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22)' : 'none'};
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 20px;
`;

class Adventure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '0.01',
      menuVisible: false,
    }
  }

  render () {
    const {
      version, 
      menuVisible
    } = this.state;

    return (
      <>
        <Wrapper bgColor={colors.green_main} visible={menuVisible}> 
          <Logo>{`Adventurer v0.01`}</Logo>     
        </Wrapper>
        <MobileMenuButton bgColor={colors.green_main}visible={menuVisible}>
          <MobileMenuIcon icon={faBars} />
        </MobileMenuButton>
      </>
    )
  }
}

export default withRouter(Adventure);