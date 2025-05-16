import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiRss } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-100">
              Skill<span className="text-indigo-400">Track</span>
            </h3>
            <p className="text-gray-400">
              Master your skills with our advanced tracking and analytics platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">API Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Stay Updated</h4>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                <FiMail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SkillTrack. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;