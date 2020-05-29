import React, {useState} from 'react';
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
  height: 30px;
  position: fixed;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  top: 0;
  left: 0;
`;

const Logo = styled(Link)`
  padding: 5px;
  color: ${({color}) => color ? color : 'black'};
  transition: 0.2s;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: ${({hlcolor}) => hlcolor ? hlcolor : 'gray'};
  }
`;

const Header = () => {
  const [version] = useState('0.01');
  return (
    <Wrapper>
      <Logo сolor={colors.color_text} hlcolor={colors.color_main_hl} to={'/'}>{`Adventurer v${version}`}</Logo>
    </Wrapper>
  )
}

export default withRouter(Header);