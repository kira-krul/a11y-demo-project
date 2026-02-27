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
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/best-sellers">Best Sellers</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/gift-cards">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><a href="/track-order">Track Order</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/sustainability">Sustainability</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SneakShop. All rights reserved.</p>
        <div className="footer-social">
          <a href="https://facebook.com/sneakshop" aria-label="Facebook">
            <FacebookIcon width={24} height={24} aria-hidden="true" />
          </a>
          <a href="https://twitter.com/sneakshop" aria-label="Twitter">
            <TwitterIcon width={24} height={24} aria-hidden="true" />
          </a>
          <a href="https://instagram.com/sneakshop" aria-label="Instagram">
            <InstagramIcon width={24} height={24} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
