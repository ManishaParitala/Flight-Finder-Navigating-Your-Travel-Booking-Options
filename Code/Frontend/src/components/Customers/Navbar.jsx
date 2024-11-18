import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutCustomer } from '../../Actions/Customer';
// import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { viewProfile } from '../../Actions/Customer';
import { clearNotification } from '../../Actions/Customer'

const Navbar = () => {


  const handlebooking = () => {

    window.location.href = '/viewmybooking';
  }

  //  userprofile

  const handleprofile = () => {

    window.location.href = '/userprofile';
  }


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCustomer());
    sessionStorage.removeItem('customer');
    window.location.href = '/login';
  };


  // notification
  const customer = JSON.parse(sessionStorage.getItem('customer'));


  useEffect(() => {
    dispatch((viewProfile(customer._id)))
  }, []);


  const customers = useSelector((state) => state.customer.profile);

  console.log(customers, "getting customers")

  const [data, setdata] = useState('');
  const [no_of_notification, setno_of_notification] = useState('')

  useEffect(() => {
    if (customers) {
      setdata(customers.Notification);
      setno_of_notification(customer.Notification.length)
    }
  })

  console.log(data, "getting data");

  const [shownotification, setshownotification] = useState(false);

  const Show = () => {
    setshownotification(!shownotification)
  }

  const clear = () => {
    dispatch(clearNotification(customer._id))
    setshownotification(false)
    window.location.reload()
  }

  return (
    <nav className="bg-red-500 p-4">
      <div className="flex justify-between items-center">
        {/* Left side: SB Flight */}
        <a href='/homepage' className="text-white text-4xl font-semibold">
          Flight Finder
        </a>

        {/* Right side: Logout, Booking, Profile */}
        <div className="hidden md:flex space-x-4">
          <a href='/homepage' className="text-white hover:text-gray-400 text-2xl">
            Home
          </a>
          <button onClick={handlebooking} className="text-white hover:text-gray-400 text-2xl">Booking</button>
          <button onClick={handleprofile} className="text-white hover:text-gray-400 text-2xl">Profile</button>
          <button onClick={handleLogout} className="text-white hover:text-gray-400 text-2xl">Logout</button>
          <button onClick={Show} className="text-white  relative ">
            {/* <p className=' text-lg font-serif absolute left-4 bottom-2  '>{no_of_notification}</p> */}
            {
              no_of_notification > 0 ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="28px" fill="#F9DB78"><path d="M480-220q25 0 42.5-17.5T540-280H420q0 25 17.5 42.5T480-220ZM280-320h400v-80h-40v-104q0-61-31.5-111.5T520-680v-20q0-17-11.5-28.5T480-740q-17 0-28.5 11.5T440-700v20q-57 14-88.5 64.5T320-504v104h-40v80Zm120-80v-120q0-33 23.5-56.5T480-600q33 0 56.5 23.5T560-520v120H400Zm80 320q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F9DB78"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>
            }

          </button>



        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white hover:text-gray-400 focus:outline-none">
            {/* Mobile menu icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden mt-2">
        <div className="flex flex-col space-y-2">
          <button className="block text-white hover:text-gray-400">Logout</button>
          <button onClick={handlebooking} className="block text-white hover:text-gray-400">Booking</button>
          <button className="block text-white hover:text-gray-400">Profile</button>
        </div>
      </div>


      {/* notificaton */}
      {shownotification &&
        <div className="min-w-64 min-h-20 bg-blue-100 rounded-xl fixed top-20 right-7">
          <button onClick={clear}
            className='text-lg mb-2 text-blue-600 hover:underline'
          >
            Clear
          </button>
          {
            data && Array.isArray(data) && data.length > 0 ? (
              data.map((n, index) => (
                <div key={index} className='p-1'>
                  <p className={`text-black`}>
                    {n.message.length > 30 ? `${n.message.slice(0, 30)}...` : n.message}
                  </p>
                </div>

              ))
            ) : (
              <p className='text-black'>No notifications available.</p>
            )
          }
        </div>
      }


    </nav>
  );
};

export default Navbar;
