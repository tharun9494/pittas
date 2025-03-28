import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-red-500">Pitta's Bawarchi</span>
            </Link>
            <div className="hidden md:flex items-center ml-8">
              <MapPin className="text-gray-400" size={20} />
              <span className="ml-2 text-gray-700">Madanapalle, Andhra Pradesh</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md font-medium">
              Menu
            </Link>
            <Link to="/orders" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md font-medium">
              Orders
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-red-500">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-red-500 flex items-center space-x-2">
                  <User size={24} />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-red-500">
                <User size={24} />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="flex items-center px-3 py-2">
                <MapPin className="text-gray-400" size={20} />
                <span className="ml-2 text-gray-700">Madanapalle, Andhra Pradesh</span>
              </div>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Cart ({totalItems})
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-500 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;