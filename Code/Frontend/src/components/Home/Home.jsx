import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div
                className="hero min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1607563424269-4984d7dd60b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpcmxpbmV8ZW58MHx8MHx8fDA%3D')`,
                }}
            >
                <div className="bg-black bg-opacity-60 absolute top-16 inset-0 min-h-screen"></div>
                <div className="relative z-10 text-white text-center p-8">
                    <div className="max-w-md mx-auto">
                        <h1 className="mb-5 text-5xl font-bold">Flight Finder</h1>
                        <p className="mb-5 text-lg">
                            Flight Finder helps you navigate the best travel booking options. With intuitive tools for price comparison and flexible search, it’s your go-to for stress-free travel planning.
                        </p>
                        <a href="/login" className="btn bg-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section id="about" className="bg-gray-900 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">About Us</h2>
                    <p className="text-lg text-white text-center mb-8">
                        At Book Flight Faster, we prioritize speed and convenience. Our platform is designed to make your flight booking experience as smooth as possible, offering a wide range of options and competitive prices.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-blue-300 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
                    <div className="flex flex-wrap justify-center">
                        {/* Feature 1 */}
                        <div className="w-full md:w-1/3 p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
                                <p>Quickly book flights with our streamlined process.</p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="w-full md:w-1/3 p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                                <p>Find competitive prices on a wide range of flights.</p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="w-full md:w-1/3 p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                                <p>Our team is here to assist you at any time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-900 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">Testimonials</h2>
                    <div className="flex flex-wrap justify-center">
                        {/* Testimonial 1 */}
                        <div className="w-full md:w-1/3 p-4">
                            <blockquote className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                "Book Flight Faster made my travel planning so easy. Highly recommended!"
                                <footer className="mt-4">— Jane Doe</footer>
                            </blockquote>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="w-full md:w-1/3 p-4">
                            <blockquote className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                                "Great service and fantastic prices. Will use again!"
                                <footer className="mt-4">— John Smith</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-bold">Book Flight Faster</h3>
                            <p>Your go-to platform for quick flight bookings.</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-md font-semibold">Quick Links</h4>
                            <ul className="text-sm space-y-1">
                                {['Home', 'About Us', 'Services', 'Contact'].map(link => (
                                    <li key={link}><a href="#" className="hover:underline">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            {/* Social media links */}
                            {['Facebook', 'Twitter', 'Instagram'].map(platform => (
                                <a key={platform} href="#" className={`hover:underline`}>{platform}</a>
                            ))}
                        </div>
                    </div>
                    {/* Footer bottom section */}
                    {new Date().getFullYear()} Book Flight Faster. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Home;