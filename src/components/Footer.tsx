import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, MessageCircle, Twitter, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-dark-purple/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-black bg-gradient-to-r from-dark-purple to-pink-500 bg-clip-text text-transparent">
                FURAB
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Kota Bogor
              </span>
            </Link>
            <p className="text-gray-500 max-w-md leading-relaxed font-medium">
              Wadah resmi komunitas fanbase Fuji Arab Couple Fans Bogor. Kami berkomitmen untuk mendukung idola dengan positif, kreatif, dan penuh semangat kebersamaan.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-purple/5 text-dark-purple flex items-center justify-center hover:bg-dark-purple hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-purple/5 text-dark-purple flex items-center justify-center hover:bg-dark-purple hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-purple/5 text-dark-purple flex items-center justify-center hover:bg-dark-purple hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-dark-purple transition-colors font-medium">About Us</Link></li>
              <li><Link to="/events" className="text-gray-500 hover:text-dark-purple transition-colors font-medium">Events</Link></li>
              <li><Link to="/gallery" className="text-gray-500 hover:text-dark-purple transition-colors font-medium">Gallery</Link></li>
              <li><Link to="/news" className="text-gray-500 hover:text-dark-purple transition-colors font-medium">News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500 font-medium">
                <Mail className="w-4 h-4 text-dark-purple" />
                furabbogor@gmail.com
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium">
                <MapPin className="w-4 h-4 text-dark-purple" />
                Kota Bogor, Jawa Barat
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium">
                <Heart className="w-4 h-4 text-dark-purple" />
                Solid, Loyal, Bersama
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm font-medium">
            © 2026 FURAB Kota Bogor. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm font-medium flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-dark-purple fill-current" /> for Fuji & Arab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
