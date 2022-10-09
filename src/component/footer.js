import React from 'react';
import  './footer.css';

const Footer = () => {
    return (
        <footer>
            <div class="inner">
                <div class="upper">
                    <h1>Image Fake</h1>
                    <ul>
                        <li><a href="#">Policy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Family Site</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>

                <div class="lower">
                    <address>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, facere.<br/>
                        TEL : 031-111-1234 C.P : 010-1234-5678
                    </address>
                    <p>
                        Â© 2022 SMU IF. Image Fake.
                    </p>
                </div>
            </div>
    </footer>
    );
}
export default Footer;