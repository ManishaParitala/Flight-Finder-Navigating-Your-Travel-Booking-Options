import React ,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {viewFlight} from '../../Actions/Admin';


const FlightTable = () => {
    const flights = [
        {
            flightName: "Airline A",
            flightNo: "AA101",
            startLocation: "New York",
            endLocation: "Los Angeles",
            startTime: "2024-10-09T10:00:00",
            endTime: "2024-10-09T13:00:00",
            seatType: "Economy",
            availableSeats: 40 // Specify available seats for Economy
        },
        {
            flightName: "Airline B",
            flightNo: "BB202",
            startLocation: "Chicago",
            endLocation: "Miami",
            startTime: "2024-10-09T14:00:00",
            endTime: "2024-10-09T17:00:00",
            seatType: "Business",
            availableSeats: 20 // Specify available seats for Business
        },
        {
            flightName: "Airline C",
            flightNo: "CC303",
            startLocation: "San Francisco",
            endLocation: "Seattle",
            startTime: "2024-10-09T09:30:00",
            endTime: "2024-10-09T11:30:00",
            seatType: "First Class",
            availableSeats: 100 // Specify available seats for First Class
        },
        {
            flightName: "Airline D",
            flightNo: "DD404",
            startLocation: "Dallas",
            endLocation: "Denver",
            startTime: "2024-10-09T15:00:00",
            endTime: "2024-10-09T17:00:00",
            seatType: "Economy",
            availableSeats: 120 // Specify available seats for Economy
        },
        {
            flightName: "Airline E",
            flightNo: "EE505",
            startLocation: "Atlanta",
            endLocation: "Boston",
            startTime: "2024-10-09T12:00:00",
            endTime: "2024-10-09T14:00:00",
            seatType: "Economy",
            availableSeats: 200 // Specify available seats for Economy
        }
    ];


    const dispatch = useDispatch();


useEffect(() => {
    dispatch(viewFlight());
},[dispatch]);


  const [allflight , setAllFlight] = useState([]);

  const flight = useSelector((state) => state.admin.flights);

  useEffect(()=>{
    setAllFlight(flight);
  },[flight]);


  console.log(allflight,"allflight");




    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Flight Schedule</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-emerald-500">
                            <th className="border border-gray-300 p-2">Flight Name</th>
                            <th className="border border-gray-300 p-2">Flight No</th>
                            <th className="border border-gray-300 p-2">Start Location</th>
                            <th className="border border-gray-300 p-2">End Location</th>
                            <th className="border border-gray-300 p-2">Start Time</th>
                            <th className="border border-gray-300 p-2">End Time</th>
                            <th className="border border-gray-300 p-2">seat capacity </th>
                            <th className="border border-gray-300 p-2">Available Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allflight && allflight.map((flight, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="border border-pink-900 p-2">{flight.flight_name}</td>
                                <td className="border border-pink-900 p-2">{flight.flight_no}</td>
                                <td className="border border-pink-900 p-2">{flight.from_location}</td>
                                <td className="border border-pink-900 p-2">{flight.to_location}</td>
                                <td className="border border-pink-900 p-2">{flight.start_time}</td>
                                <td className="border border-pink-900 p-2">{flight.end_time}</td>
                                <td className="border border-pink-900 p-2">{flight.price}</td>
                                <td className="border border-pink-900 p-2">{flight.seat_capacity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightTable;
