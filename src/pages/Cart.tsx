import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { initiatePayment } from '../services/paymentService';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      return;
    }

    try {
      setIsProcessing(true);
      const orderId = `ORDER_${Date.now()}_${user.id}`;
      
      await initiatePayment({
        amount: totalAmount + 40, // Including delivery fee
        orderId,
        userId: user.id,
        userEmail: user.email || '',
        userName: user.name
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to your cart!</p>
          <Link
            to="/menu"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600"
          >
            Browse Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/menu/${item.id}`} className="hover:text-red-500">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-lg font-medium text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={isProcessing}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={isProcessing}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                            disabled={isProcessing}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal ({totalItems} items)</dt>
                    <dd className="font-medium text-gray-900">₹{totalAmount}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Delivery Fee</dt>
                    <dd className="font-medium text-gray-900">₹40</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                    <dd className="text-base font-medium text-gray-900">₹{totalAmount + 40}</dd>
                  </div>
                </dl>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || !user}
                className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  <>
                    {user ? 'Proceed to Pay' : 'Login to Checkout'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              {!user && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Please{' '}
                  <Link to="/login" className="text-red-500 hover:text-red-600">
                    login
                  </Link>{' '}
                  to proceed with checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;