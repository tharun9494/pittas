import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Clock, MapPin, Search, ChevronDown, Utensils, Coffee, Pizza, Merge as Hamburger } from 'lucide-react';

const Home = () => {
  const [location] = useState('Madanapalle, Andhra Pradesh');
  
  const collections = [
    {
      id: 1,
      title: "Local Favorites",
      description: "15 Places",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af"
    },
    {
      id: 2,
      title: "Best of Andhra Cuisine",
      description: "20 Places",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
    },
    {
      id: 3,
      title: "Premium Dining",
      description: "8 Places",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696"
    },
    {
      id: 4,
      title: "Great Cafes",
      description: "12 Places",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
    }
  ];

  const cuisines = [
    { name: "Andhra", icon: Utensils, count: 45 },
    { name: "South Indian", icon: Utensils, count: 38 },
    { name: "Fast Food", icon: Hamburger, count: 25 },
    { name: "Beverages", icon: Coffee, count: 20 },
  ];

  const popularRestaurants = [
    {
      id: 1,
      name: "Andhra Ruchulu",
      image: "https://images.unsplash.com/photo-1567337710282-00832b415979",
      rating: 4.5,
      cuisine: "Andhra • Biryani • Meals",
      priceForTwo: "₹300",
      deliveryTime: "30-40 min",
      promoted: true,
      discount: "50% OFF up to ₹100",
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Sri Sai Tiffins",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e3",
      rating: 4.3,
      cuisine: "South Indian • Tiffins • Coffee",
      priceForTwo: "₹200",
      deliveryTime: "20-30 min",
      promoted: false,
      discount: "20% OFF",
      distance: "0.8 km"
    },
    {
      id: 3,
      name: "Royal Restaurant",
      image: "https://images.unsplash.com/photo-1514412076816-d228b5c0973c",
      rating: 4.4,
      cuisine: "North Indian • Chinese • Biryani",
      priceForTwo: "₹400",
      deliveryTime: "35-45 min",
      promoted: true,
      discount: "Free delivery",
      distance: "1.5 km"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-b from-black to-transparent">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af"
            alt="South Indian Food"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-full max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold mb-6 text-white"
            >
              Discover Madanapalle's Best Food
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-3 rounded-lg shadow-lg flex items-center space-x-4"
            >
              <div className="flex-1 flex items-center border-r border-gray-300 pr-4">
                <MapPin className="text-red-500 mr-2" size={24} />
                <input
                  type="text"
                  value={location}
                  readOnly
                  className="w-full focus:outline-none text-gray-700 bg-transparent"
                  placeholder="Madanapalle, Andhra Pradesh"
                />
              </div>
              <div className="flex-1 flex items-center">
                <Search className="text-gray-400 mr-2" size={24} />
                <input
                  type="text"
                  className="w-full focus:outline-none text-gray-700"
                  placeholder="Search for restaurant or dish"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {cuisines.map((cuisine) => (
              <div key={cuisine.name} className="flex-shrink-0">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors">
                  <cuisine.icon size={20} />
                  <span>{cuisine.name}</span>
                  <span className="text-gray-400 text-sm">({cuisine.count})</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Collections</h2>
              <p className="text-gray-600">Explore curated lists of top restaurants and local favorites in Madanapalle</p>
            </div>
            <button className="text-red-500 flex items-center hover:text-red-600">
              All collections <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                    <p className="text-sm">{collection.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular in Madanapalle</h2>
            <button className="text-red-500 flex items-center hover:text-red-600">
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {restaurant.promoted && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      Promoted
                    </div>
                  )}
                  {restaurant.discount && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                      {restaurant.discount}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                    <div className="flex items-center bg-green-700 text-white px-2 py-1 rounded">
                      <span className="mr-1">{restaurant.rating}</span>
                      <Star size={14} className="fill-current" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{restaurant.priceForTwo} for two</span>
                    <span>•</span>
                    <span>{restaurant.deliveryTime}</span>
                    <span>•</span>
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;