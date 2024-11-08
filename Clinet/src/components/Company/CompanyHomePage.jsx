import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CompanyHomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Company'); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === 'Logout') {
  
      window.location.href = '/';
     }
    // Add navigation logic here if needed
  };





  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className="bg-slate-100 text-slate-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-serif underline">CompanyHomePage</h1>
        <button  className="md:hidden">
          <span className="material-icons">menu</span>
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className={`bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
          <ul>
            {['AddFlights', 'ViewFlights', 'ViewBooking', 'Logout'].map((item) => (
                <NavLink to={item === 'AddFlights' ? 'addflight' : item === 'ViewFlights' ? 'viewflights' : item === 'ViewBooking' ? 'viewbookings'  :'logout' }>
              <li
                key={item}
                className={`py-2 cursor-pointer font-serif p-3 rounded-lg ${activeItem === item ? 'bg-blue-600' : ''}`} 
                onClick={() => handleItemClick(item)} 
              >
                <span className="material-icons">{item === 'Company' ? '' : item === 'Users' ? '' : item === 'Flights' ? '' : item === 'Booking' ? '' : ''}</span> {item}
              </li>
                </NavLink>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

  
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
        <div className="flex justify-around p-2">
          {['Company', 'Users', 'Flights', 'Booking', 'Logout'].map((item) => (
            <NavLink to={item === 'Company' ? 'companytable' : item === 'Users' ? 'users' : item === 'Flights' ? 'flights' : item === 'Booking' ? 'booking' : 'logout'}>
            <span key={item} className="flex flex-col items-center cursor-pointer" onClick={() => handleItemClick(item)}>
              <span className="material-icons">{item === 'Company' ? '' : item === 'Users' ? '' : item === 'Flights' ? '' : item === 'Booking' ? '' : ''}</span>
              <span className="text-sm">{item}</span>
            </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyHomePage;
