import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../resources/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative h-auto rounded-tl-4xl bg-gradient-to-b from-black to-[rgb(56,23,1)] text-white py-12 px-4 md:px-8 mt-52 z-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Jobs Section */}
        <div className="space-y-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-32 h-auto" />
          </Link>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">
            Echanger avec nous
          </h3>
          <div className="space-y-3">
            <a
              href="/contact"
              className="group flex items-center space-x-3 hover:text-orange-500 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
              <span className="border-b border-transparent group-hover:border-orange-500 transition-all">
                Nous contacter
              </span>
            </a>
            <a
              href="/complaints"
              className="group flex items-center space-x-3 hover:text-orange-500 transition-colors"
            >
              <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
              <span className="border-b border-transparent group-hover:border-orange-500 transition-all">
                À propos
              </span>
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">
            Nous suivre
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()}. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
