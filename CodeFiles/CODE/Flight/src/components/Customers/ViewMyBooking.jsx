import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { viewBooking,cancelBooking } from '../../Actions/Customer';

const ViewMyBooking = () => {
  const dispatch = useDispatch();
  const customer = JSON.parse(sessionStorage.getItem('customer'));

  React.useEffect(() => {
    dispatch(viewBooking(customer._id));
  }, [dispatch, customer._id]);

  const [allBooking, setAllBooking] = React.useState([]);
  const booking = useSelector((state) => state.customer.bookings);

  useEffect(() => {
    if (booking) {
      setAllBooking(booking);
    }
  }, [booking]);

  const handleCancelBooking = (id) => {
    dispatch(cancelBooking(id));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
   
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-full min-h-screen mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">My Booking Details</h2>
        {allBooking.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {allBooking.map((bookingItem, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Flight Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded">
                    <strong>From:</strong> {bookingItem.flight[0]?.from_location}
                  </div>
                  <div className="bg-gray-100 p-4 rounded">
                    <strong>To:</strong> {bookingItem.flight[0]?.to_location}
                  </div>
                  <div className="bg-gray-100 p-4 rounded">
                    <strong>Date:</strong> {new Date(bookingItem.flight[0]?.date).toLocaleDateString()}
                  </div>
                  <div className="bg-gray-100 p-4 rounded">
                    <strong>Time:</strong> {bookingItem.flight[0]?.start_time}
                  </div>
                  <div className="bg-gray-100 p-4 rounded">
                    <strong>Price:</strong> {bookingItem.price}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-4">Passenger Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookingItem.booking.map((passenger, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded">
                      <strong>Name:</strong> {passenger.passenger_name} - <strong>Age:</strong> {passenger.passenger_age} <strong> </strong> {passenger.seat_no}
                    </div>
                  ))}
                </div>
                <button
          onClick={()=>handleCancelBooking(bookingItem._id)}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 mt-4"
        >
          Cancel Booking
        </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}

        
      </div>
    </div>
  );
};

export default ViewMyBooking;
