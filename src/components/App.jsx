// Dependencies
import React from 'react';

// Components
import Header from './header/Header.jsx';
import Content from './content/Content.jsx';
import Footer from './footer/Footer.jsx';
import Terrain from './map/Terrain.jsx';

// Styles
import './App.scss';

function App() {  
  return (
    <div className="site-wrapper">
      <Header />
      <Terrain />
    </div>
  );
}

export default App; 