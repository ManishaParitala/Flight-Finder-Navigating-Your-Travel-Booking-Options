import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="">
        <Navbar />

    <div style={{ backgroundImage: `url('home.png')`, height: '1000px', width: '100%'  }} className=' absolute m-0 p-0'>
    </div>
    <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">Company Name</h3>
                        <p className="text-sm">Your tagline or slogan here.</p>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-md font-semibold">Links</h4>
                        <ul className="text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Services</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:underline">Facebook</a>
                            <a href="#" className="hover:underline">Twitter</a>
                            <a href="#" className="hover:underline">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Home
