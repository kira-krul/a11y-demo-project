import FacebookIcon from '../assets/icons/facebook.svg?react';
import TwitterIcon from '../assets/icons/twitter.svg?react';
import InstagramIcon from '../assets/icons/instagram.svg?react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="#New Arrivals">New Arrivals</a></li>
            <li><a href="#Best Sellers">Best Sellers</a></li>
            <li><a href="#Sale">Sale</a></li>
            <li><a href="#Gift Cards">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><a href="#Track Order">Track Order</a></li>
            <li><a href="#Returns & Exchanges">Returns & Exchanges</a></li>
            <li><a href="#Shipping Info">Shipping Info</a></li>
            <li><a href="#Size Guide">Size Guide</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="#Our Story">Our Story</a></li>
            <li><a href="#Careers">Careers</a></li>
            <li><a href="#Sustainability">Sustainability</a></li>
            <li><a href="#Press">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#Privacy Policy">Privacy Policy</a></li>
            <li><a href="#Terms of Service">Terms of Service</a></li>
            <li><a href="#Cookie Policy">Cookie Policy</a></li>
            <li><a href="#Accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SneakShop. All rights reserved.</p>
        <div className="footer-social">
          <a href="#Facebook" aria-label="Facebook">
            <FacebookIcon width={24} height={24} />
          </a>
          <a href="#Twitter" aria-label="Twitter">
            <TwitterIcon width={24} height={24} />
          </a>
          <a href="#Instagram" aria-label="Instagram">
            <InstagramIcon width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
