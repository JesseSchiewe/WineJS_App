import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/home" tabIndex={tabIndex}>
        <span aria-hidden="true">📩</span>
        Home
      </a>  
      <a href="/review" tabIndex={tabIndex}>
        <span aria-hidden="true">&#127863;</span>
        Review
      </a>  
      <a href="/reviewresult" tabIndex={tabIndex}>
        <span aria-hidden="true">&#129351;</span>
        Results
      </a>
      <a href="/profilepage" tabIndex={tabIndex}>
        <span aria-hidden="true">💁🏻‍♂️</span>
        Profile
      </a>  
      <a href="/about" tabIndex={tabIndex}>
        <span aria-hidden="true">&#129346;</span>
        About us
      </a>
      <a href="/contact" tabIndex={tabIndex}>
        <span aria-hidden="true">📩</span>
        Contact
      </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;