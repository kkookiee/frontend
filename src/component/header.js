import React from 'react';
import icon from './resource/icon.svg';
import  './header.css';

const Header = () => {
  return (
      <header class="header">
          <nav class="navbar">
            <ul class="navmake">
              <li class="item">
                <a href="#!" class="menu_link"><span class="item_wrap" />Service</a>
              </li>
              <li class="item">
                <a href="/"><img src={icon} alt="" weight="70" height="70"/></a>
              </li>
              <li class="item">
                <a href="#!" class="menu_link"><span class="item_wrap"/>Tech</a>
              </li>
            </ul>
          </nav>
      </header>  
  );
}

export default Header;