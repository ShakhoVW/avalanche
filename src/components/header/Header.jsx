// Dependencies
import React, { PropTypes } from 'react'
import { Button, Badge, Panel, Grid, Row, Col, Tab, Navbar, Nav, NavItem } from 'react-bootstrap';

// Styles
import './Header.scss';

const Header = ({ onClick, completed, text }) => (
  <div className='header'>
    <h1>Avalanche service</h1>
    <Button
        onClick={onClick}
        style={{
              textDecoration: completed ? 'line-through' : 'none'
            }}
      >
        {text}
    </Button>
  </div>
)

Header.propTypes = {
  onClick   : PropTypes.func.isRequired,
  completed : PropTypes.bool.isRequired,
  text      : PropTypes.string.isRequired
}

export default Header;