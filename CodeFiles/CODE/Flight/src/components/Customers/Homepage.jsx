import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlight, bookFlight } from '../../Actions/Customer';

const Homepage = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [date, setDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [passengers, setPassengers] = useState([{ passenger_name: '', passenger_age: '' }]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchFlight());
  }, [dispatch]);

  const flight = useSelector((state) => state.customer.flight);

  useEffect(() => {
    if (flight) {
      setFilteredFlights(flight); // Set initial filtered flights
    }
  }, [flight]);

  const fromLocation = [...new Set(filteredFlights.map(flight => flight.from_location))];
  const toLocation = [...new Set(filteredFlights.map(flight => flight.to_location))];

  const formatDate = (date) => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Months are zero-based
    let year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    const results = flight.filter((flight) =>
      flight.from_location.toLowerCase().includes(startLocation.toLowerCase()) &&
      flight.to_location.toLowerCase().includes(endLocation.toLowerCase()) &&
      formatDate(flight.date) === date
    );
    setFilteredFlights(results);
  };

  const [id, setId] = useState(null);
  const [date1, setDate1] = useState(null);

  const openModal = (id, date) => {
    setIsModalOpen(true);
    setId(id);
    setDate1(date);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleNumberOfPassengersChange = (e) => {
    const count = Number(e.target.value);
    setNumberOfPassengers(count);
    
    // Update the passengers state to match the number of passengers
    const updatedPassengers = [...passengers];

    // If increasing the number of passengers, add new empty objects
    while (updatedPassengers.length < count) {
      updatedPassengers.push({ passenger_name: '', passenger_age: '' });
    }
    
    // If decreasing the number of passengers, slice the array
    if (updatedPassengers.length > count) {
      updatedPassengers.splice(count);
    }

    setPassengers(updatedPassengers);
  };

  const customer = JSON.parse(sessionStorage.getItem('customer'));

  const handleBookFlight = (e) => {
    e.preventDefault();
    const data = {
      email,
      mobile,
      flight_id: id,
      no_of_seats: numberOfPassengers,
      booking_date: date1,
      booking: passengers,
    };
    dispatch(bookFlight(customer._id, data));
    closeModal();
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 ml-4">
        <img src="/flight.png" alt="Flight" className="w-[1200px] h-[500px] ml-20 rounded-md" />
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1 mb-4">
            <label className="block text-gray-700">Start Location</label>
            <select
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select start location</option>
              {fromLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 mb-4">
            <label className="block text-gray-700">End Location</label>
            <select
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select end location</option>
              {toLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Search Flights
        </button>

        {filteredFlights.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">Available Flights:</h3>
            <ul className="space-y-4">
              {filteredFlights.map((flight) => (
                <li key={flight.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-md border border-gray-300">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold">
                      {flight.from_location} to {flight.to_location}
                    </h4>
                    <p className="text-gray-600">
                      Departure: <span className="font-semibold">{formatDate(flight.date)}</span> at <span className="font-semibold">{flight.start_time}</span> - 
                      <span className="font-semibold"> {flight.end_time}</span>
                    </p>
                    <p className="text-gray-700">
                      Price: <span className="font-semibold">₹{flight.price}</span> | 
                      <span className="font-semibold">{flight.seat_capacity}</span> seats available
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => openModal(flight._id, flight.date)}
                  >
                    Book Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-scroll">
          <div className="bg-white rounded-lg p-6 max-w-[700px]">
            <h2 className="text-xl font-semibold mb-4">Booking Form</h2>
            <form onSubmit={handleBookFlight}>
              <div className="flex justify-around space-x-3">
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Passengers</label>
                <input
                  type="number"
                  value={numberOfPassengers}
                  onChange={handleNumberOfPassengersChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  min="1"
                  max="10"
                />
              </div>

              {passengers.map((_, index) => (
                <div key={index} className="mb-4 flex space-x-4">
                  <div>
                    <label className="block text-gray-700">Passenger {index + 1} Name</label>
                    <input
                      type="text"
                      value={passengers[index].passenger_name}
                      onChange={(e) => handlePassengerChange(index, 'passenger_name', e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Passenger {index + 1} Age</label>
                    <input
                      type="number"
                      value={passengers[index].passenger_age}
                      onChange={(e) => handlePassengerChange(index, 'passenger_age', e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                </div>
              ))}

              <h3 className="text-lg font-semibold mb-2">Card Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Card Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="month"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">CVV</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
