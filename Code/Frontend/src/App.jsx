import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Home/Register';
import Login from './components/Home/Login';
import Homepage from './components/Customers/Homepage';
import ViewMyBooking from './components/Customers/ViewMyBooking';
import AdminPanel from './components/Admin/AdminPanel';
import CompanyTable from './components/Admin/CompanyTable';
import Users from './components/Admin/Users';
import FlightTable from './components/Admin/FlightTable';
import CompanyHomePage from './components/Company/CompanyHomePage';
import Registers from './components/Company/Register';
import AddFlightForm from './components/Company/AddFlightForm';
import Logins from './components/Company/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewFlights from './components/Company/ViewFlights';
import ViewBookings from './components/Company/ViewBookings';
import UserProfile from './components/Customers/UserProfile';
import ForgotPasswordModal from './components/Home/ForgotPasswordModal';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<ForgotPasswordModal />}></Route>


          <Route path='/homepage' element={<Homepage />} />
          <Route path='/viewmybooking' element={<ViewMyBooking />} />
          <Route path='/userprofile' element={<UserProfile />} />


          <Route path='/adminpanel' element={<AdminPanel />} >
            <Route path='companytable' element={<CompanyTable />} />
            <Route path='users' element={<Users />} />
            <Route path='flights' element={<FlightTable />} />
          </Route>



          <Route path='/company/register' element={<Registers />} />
          <Route path='/company/login' element={<Logins />} />
          <Route path='/company' element={<CompanyHomePage />} >
            <Route path='addflight' element={<AddFlightForm />} />
            <Route path='addflight/:id' element={<AddFlightForm />} />

            <Route path='viewflights' element={<ViewFlights />} />
            <Route path='viewbookings' element={<ViewBookings />} />
          </Route>


        </Routes>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
