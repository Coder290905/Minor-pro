import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wind, BarChart2, PieChart, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Define navigation items
  const navItems = [
    { 
      path: '/', 
      name: 'AQI Dashboard', 
      icon: <Wind className="mr-2" size={20} />,
      description: 'View current Air Quality Index'
    },
    { 
      path: '/gases', 
      name: 'Gas Analysis', 
      icon: <BarChart2 className="mr-2" size={20} />,
      description: 'Detailed gas information and hazards'
    },
    { 
      path: '/distribution', 
      name: 'Gas Distribution', 
      icon: <PieChart className="mr-2" size={20} />,
      description: 'Visual breakdown of air composition'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Wind className="h-8 w-8 text-blue-700" />
                <span className="ml-2 text-xl font-bold text-blue-900">Air Quality Dashboard</span>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-md">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Wind className="h-7 w-7 text-blue-700" />
            <span className="ml-2 text-lg font-bold text-blue-900">Air Quality</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <div>
                    <div>{item.name}</div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;