import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {viewFlight,deleteFlight} from '../../Actions/Company';


const ViewFlights = () => {
  // Dummy flight data
  const [flights, setFlights] = useState([
    {
      id: 1,
      flight_name: 'Air India',
      flight_no: 'AI123',
      from_location: 'Delhi',
      to_location: 'Mumbai',
      start_time: '10:00 AM',
      end_time: '12:00 PM',
      date: '2024-10-15',
      seat_type: 'Economy',
      seat_capacity: 150,
      price: 5000,
      status: 'On Time',
    },
    {
      id: 2,
      flight_name: 'Indigo',
      flight_no: '6E456',
      from_location: 'Chennai',
      to_location: 'Bangalore',
      start_time: '01:00 PM',
      end_time: '02:30 PM',
      date: '2024-10-16',
      seat_type: 'Business',
      seat_capacity: 120,
      price: 7000,
      status: 'Delayed',
    },
    // Add more dummy flights as needed
  ]);

  const handleUpdate = (id) => {
    window.location.href = `addflight/${id}`;
    // You can add logic to open a modal for editing or direct the user to an update form
  };



  const dispatch = useDispatch();

  const company = JSON.parse(sessionStorage.getItem('company'));

  useEffect(() => {
    dispatch(viewFlight(company._id));
  }, [dispatch]);

  const flight = useSelector((state) => state.company.flight);

  useEffect(() => {
    if (flight) {
      setFlights(flight);
    }
  }, [flight]);

  const handleDelete = (id) => {
    dispatch(deleteFlight(id));
    dispatch(viewFlight(company._id));
 };











  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">View Flights</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="bg-gray-200">
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
              <tr key={flight.id} className="border-t">
                <td className="px-4 py-2">{flight.flight_name}</td>
                <td className="px-4 py-2">{flight.flight_no}</td>
                <td className="px-4 py-2">{flight.from_location}</td>
                <td className="px-4 py-2">{flight.to_location}</td>
                <td className="px-4 py-2">{flight.start_time}</td>
                <td className="px-4 py-2">{flight.end_time}</td>
                <td className="px-4 py-2">{flight.date}</td>
                <td className="px-4 py-2">{flight.seat_type}</td>
                <td className="px-4 py-2">{flight.seat_capacity}</td>
                <td className="px-4 py-2">{flight.price}</td>
                <td className={`px-4 py-2 ${flight.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>
                  {flight.status}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    onClick={() => handleUpdate(flight._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(flight._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFlights;
