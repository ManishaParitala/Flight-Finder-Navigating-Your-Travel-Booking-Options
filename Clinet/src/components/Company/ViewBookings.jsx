import React, { useState,useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch,useSelector } from 'react-redux';
import {viewBooking} from '../../Actions/Company';

const ViewBookings = () => {
  // Dummy flight and booking data
  const [flights, setFlights] = useState([
    {
      id: 1,
      flight_name: 'Air India',
      flight_no: 'AI123',
      from_location: 'Delhi',
      to_location: 'Mumbai',
      date: '2024-10-15',
      passengers: [
        { seat_no: '12A', passenger_name: 'John Doe', passenger_age: 30 },
        { seat_no: '12B', passenger_name: 'Alice Smith', passenger_age: 28 },
      ],
    },
    {
      id: 2,
      flight_name: 'Indigo',
      flight_no: '6E456',
      from_location: 'Chennai',
      to_location: 'Bangalore',
      date: '2024-10-16',
      passengers: [
        { seat_no: '5C', passenger_name: 'Jane Smith', passenger_age: 25 },
        { seat_no: '5D', passenger_name: 'Michael Doe', passenger_age: 27 },
      ],
    },
    // Add more flights and bookings as needed
  ]);

 const dispatch = useDispatch();
  const company = JSON.parse(sessionStorage.getItem('company'));

  React.useEffect(() => {
    dispatch(viewBooking(company._id));
  }, [dispatch, company._id]);


  const booking = useSelector((state) => state.company.bookings);

  // console.log(booking, "booking");


  const [allBooking, setAllBooking] = React.useState([]);

  useEffect(() => {
    if (booking) {
      setAllBooking(booking);
    }
  }, [booking]);

  console.log(allBooking, "allBooking");



  // loog the all flight data

 allBooking.map((flight, index) => {
  // console.log(flight, "flight");
    flight.booking.forEach((passengers, index) => {
      // console.log(passengers, "passengers");
      passengers.forEach((passenger,index) => {
        // console.log(passenger, "passenger");
      })
    })
  })










 const date = (date) => {
const d = new Date(date);
return d.toLocaleDateString();
 }





  const handleDownload = (flight) => {
    const doc = new jsPDF();
  
    // Add title and flight details
    doc.setFontSize(18);
    doc.text("Flight Booking Details", 10, 10);
  
    // Flight details table
    doc.autoTable({
      head: [['Flight Name', 'Flight No', 'From', 'To', 'Date']],
      body: [
        [flight?.flights[0].flight_name, flight?.flights[0].flight_no, flight?.flights[0].from_location, flight?.flights[0].to_location, flight?.flights[0].date],
      ],
      startY: 20,
    });
    
  
    // Passenger details table
    doc.text("Passenger Details", 10, doc.autoTable.previous.finalY + 10);
  
    // Check if passengers exist and is an array
    const passengerData = Array.isArray(flight.booking) 
      ? flight.booking.flatMap((passengers) =>
          passengers.map((passenger) => [
            passenger.seat_no,
            passenger.passenger_name,
            passenger.passenger_age,
          ])
        ) 
      : []; // Default to an empty array if not defined or not an array
  
    // Create the passenger details table
    doc.autoTable({
      head: [['Seat No', 'Passenger Name', 'Passenger Age']],
      body: passengerData,
      startY: doc.autoTable.previous.finalY + 20,
    });
  
    // Save the PDF
    doc.save(`Booking_${flight?.flights[0].flight_no}.pdf`);
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">View Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="px-4 py-2">Flight Name</th>
              <th className="px-4 py-2">Flight No</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Date</th>
              {/* <th className="px-4 py-2">Passengers</th> */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBooking.map((flight) => (
              
              <tr key={flight.id} className="border-t">
                <td className="px-4 py-2">{flight?.flights[0].flight_name}</td>
                <td className="px-4 py-2">{flight?.flights[0].flight_no}</td>
                <td className="px-4 py-2">{flight?.flights[0].from_location}</td>
                <td className="px-4 py-2">{flight?.flights[0].to_location}</td>
                <td className="px-4 py-2">{flight?.flights[0].date}</td>
                {/* <td className="px-4 py-2">
                  {flight.booking.forEach((passengers, index) => (
                    passengers.forEach((passenger,index) => (
                    <div key={index}>
                      <span>Seat {passenger.seat_no} - {passenger.passenger_name} ({passenger.passenger_age} yrs)</span>
                    </div>
                    ))
                  ))}
                </td> */}
                <td className="px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDownload(flight)}
                  >
                    Download
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

export default ViewBookings;
