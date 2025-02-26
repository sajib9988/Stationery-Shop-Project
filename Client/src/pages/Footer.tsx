import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 mb-2 rounded-lg">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shop Info */}
        <div>
          <h2 className="text-xl font-semibold">Stationery Shop</h2>
          <p className="mt-2 text-gray-400">
            Your one-stop shop for all stationery needs. Quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <div className="mt-2 space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><Phone size={16} /> +123 456 7890</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@stationeryshop.com</p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2025 Stationery Shop. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
