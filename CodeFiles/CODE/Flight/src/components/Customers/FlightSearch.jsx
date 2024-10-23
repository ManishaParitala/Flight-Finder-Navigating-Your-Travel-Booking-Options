import React, { useState } from 'react';

const FlightSearch = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [date, setDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);

  // Dummy flight data
  const dummyFlights = [
    { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-10-20', price: '$300', time: '10:00 AM' },
    { id: 2, from: 'Chicago', to: 'Miami', date: '2024-10-22', price: '$250', time: '1:30 PM' },
    { id: 3, from: 'San Francisco', to: 'New York', date: '2024-10-25', price: '$400', time: '3:45 PM' },
    { id: 4, from: 'Los Angeles', to: 'Seattle', date: '2024-10-28', price: '$350', time: '5:15 PM' },
  ];

  const handleSearch = () => {
    const results = dummyFlights.filter((flight) =>
      flight.from.toLowerCase().includes(startLocation.toLowerCase()) &&
      flight.to.toLowerCase().includes(endLocation.toLowerCase()) &&
      flight.date === date
    );
    setFilteredFlights(results);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 flex space-x-9">
      <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Start Location</label>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter start location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Location</label>
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter end location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Search Flights
      </button>

      {/* Filtered Flights Results */}
      {filteredFlights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Available Flights:</h3>
          <ul className="space-y-2">
            {filteredFlights.map((flight) => (
              <li key={flight.id} className="p-4 bg-gray-100 rounded-md">
                {flight.from} to {flight.to} on {flight.date} - {flight.time} - {flight.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
