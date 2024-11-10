import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { viewBooking, cancelBooking } from '../../Actions/Customer';

const ViewMyBooking = () => {
  const dispatch = useDispatch();
  const customer = JSON.parse(sessionStorage.getItem('customer'));

  useEffect(() => {
    dispatch(viewBooking(customer._id));
  }, [dispatch, customer._id]);

  const [allBooking, setAllBooking] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const booking = useSelector((state) => state.customer.bookings);

  useEffect(() => {
    if (booking) {
      setAllBooking(booking);
    }
  }, [booking]);

  const handleCancelBooking = (bookingItem) => {
    setSelectedBooking(bookingItem);
    setShowModal(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBooking) {
      dispatch(cancelBooking(selectedBooking._id));
      setShowModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-full min-h-screen mx-auto bg-blue-100 shadow-md rounded-lg p-6 mt-10">
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
                    <strong>Price:</strong> ₹{bookingItem.price + bookingItem.price * 0.12}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-4">Passenger Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookingItem.booking.map((passenger, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded">
                      <strong>Name:</strong> {passenger.passenger_name} - <strong>Age:</strong> {passenger.passenger_age} - {passenger.seat_no}
                    </div>
                  ))}
                </div>
                {bookingItem.status !== "flight cancelled" ?
                  <button
                    onClick={() => handleCancelBooking(bookingItem)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 mt-4"
                  >
                    Cancel Booking
                  </button>
                  :
                  <>
                    <div className="mt-2 mb-2 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md shadow-md">
                      The flight is canceled, and a full refund of ₹{(bookingItem.price + bookingItem.price * 0.12).toFixed(2)} will be made to the same payment method.
                    </div>
                    <a href="/homepage" className=" text-blue-600 hover:text-blue-800 transition duration-200">
                      Find alternate flights
                    </a>
                  </>
                }
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}

        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-center">Cancellation Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span><strong>Original Price:</strong></span>
                  <span>₹{selectedBooking.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>(-) Cancellation Deduction (30%):</strong></span>
                  <span>₹{(selectedBooking.price * 0.30).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Ticket Refund Amount:</strong></span>
                  <span>₹{(selectedBooking.price * 0.70).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>(+) IGST Refund (12%):</strong></span>
                  <span>₹{(selectedBooking.price * 0.12).toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Refund Amount:</span>
                  <span>₹{(selectedBooking.price * 0.70 + selectedBooking.price * 0.12).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={confirmCancelBooking}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Confirm Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMyBooking;