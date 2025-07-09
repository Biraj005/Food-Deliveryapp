import { assets } from '../../assets/assets'
import './Footer.css'
function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="foot-content-left">
                    <img src={assets.logo} alt="logo" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore atque distinctio consequuntur minima doloribus sed necessitatibus maxime facilis impedit. Voluptatum magni voluptate velit officiis debitis corrupti reprehenderit sapiente a fugiat?</p>
                  <div className="social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                  </div>
                </div>
                <div className="foot-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div className="foot-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-7810941767</li>
                        <li>rcontact@tomato.com</li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className="footer-copy-right">
                Copyright 2025 Tomato - All Right Reserved
            </p>

        </div>
    )
}

export default Footer