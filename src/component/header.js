import React from 'react';
import icon from './resource/icon.png';
import  './header.css';

const Header = () => {
  return (
    <header>
      <div class="inner">
        <h1><a href="#">
          <img
              alt=""
              src={icon}
              width="45"
              height="45"
            />{' '}
            Image Fake</a></h1>
          
            <ul id="gnb">
                <li><a href="#">GALLERY</a></li>
                <li><a href="#">YOUTUBE</a></li>
                <li><a href="#">COMMUNITY</a></li>
                <li><a href="#">LOCATION</a></li>
            </ul>

            <ul class="util">
                <li><a href="#">Login</a></li>
                <li><a href="#">Join</a></li>
            </ul>
        </div>
    </header>
  );
}

export default Header;