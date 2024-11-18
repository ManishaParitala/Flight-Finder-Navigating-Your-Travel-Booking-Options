import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { viewFlight, deleteFlight } from '../../Actions/Company';

const ViewFlights = () => {
  const [flights, setFlights] = useState([]);
  const dispatch = useDispatch();
  const company = JSON.parse(sessionStorage.getItem('company'));

  useEffect(() => {
    dispatch(viewFlight(company._id));
  }, [dispatch, company._id]);

  const flight = useSelector((state) => state.company.flight);

  useEffect(() => {
    if (flight) {
      setFlights(flight);
    }
  }, [flight]);

  const handleUpdate = (id) => {
    window.location.href = `addflight/${id}`;
  };

  const handleDelete = (id) => {
    dispatch(deleteFlight(id));
    dispatch(viewFlight(company._id));
  };

  const handleCancelFlight = async (flightId) => {
    try {
      await axios.patch(`/api/company/cancel/${flightId}`);
      alert('Flight and associated bookings have been cancelled.');
      dispatch(viewFlight(company._id)); // Refresh flight list
    } catch (error) {
      console.error('Error cancelling flight:', error);
      alert('Failed to cancel flight.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">View Flights</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="bg-emerald-500">
            <tr className="text-left">
              <th className="px-4 py-2">Flight Name</th>
              <th className="px-4 py-2">Flight No</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Seat Type</th>
              <th className="px-4 py-2">Capacity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights && flights.map((flight) => (
              <tr key={flight._id} className="border-t">
                <td className="px-4 py-2">{flight.flight_name}</td>
                <td className="px-4 py-2">{flight.flight_no}</td>
                <td className="px-4 py-2">{flight.from_location}</td>
                <td className="px-4 py-2">{flight.to_location}</td>
                <td className="px-4 py-2">{flight.start_time}</td>
                <td className="px-4 py-2">{flight.end_time}</td>
                <td className="px-4 py-2">{new Date(flight.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{flight.seat_type}</td>
                <td className="px-4 py-2">{flight.seat_capacity}</td>
                <td className="px-4 py-2">{flight.price}</td>
                <td className={`px-4 py-2 ${flight.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>
                  {flight.status}
                </td>
                {flight.status !== "cancelled" && <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    onClick={() => handleUpdate(flight._id)}
                  >
                    Update
                  </button>
                  {/* <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(flight._id)}
                  >
                    Delete
                  </button> */}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => handleCancelFlight(flight._id)}
                  >
                    Cancel Flight
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFlights;