import React from 'react'

function LiveCourse() {
    return (
        <div>
            <div className="flex flex-col md:flex-row bg-white p-6 rounded-xl shadow-xl max-w-5xl w-full">
                {/* Left Section */}
                <div className="md:w-2/3 text-white p-6 space-y-6">
                    <h1 className="text-3xl font-bold">LIVE Interactive Courses at ₹8,999</h1>
                    <p className="text-lg">
                        Students' most trusted platform now becomes the most affordable!
                    </p>
                    <div className="flex flex-wrap space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="material-icons">schedule</span>
                            <span>220+ Hours of LIVE Lectures</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="material-icons">video_library</span>
                            <span>Hi-Tech Portal for Recordings &amp; Coding Practice</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="material-icons">support</span>
                            <span>1:1 Doubt Support</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="material-icons">work</span>
                            <span>Job Assistance &amp; Certificate</span>
                        </div>
                    </div>
                    {/* Sale Section */}
                    <div className="bg-red-600 p-4 rounded-lg text-white">
                        <h2 className="font-bold text-xl">VALENTINE DAY SALE IS LIVE</h2>
                        <p>
                            GET FLAT <strong>20% OFF</strong> | USE CODE: <strong>VLT20</strong>
                        </p>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <span className="text-2xl font-bold">01</span>
                                <p>Days</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-bold">23</span>
                                <p>Hours</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-bold">07</span>
                                <p>Minutes</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-bold">52</span>
                                <p>Seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Section (Form) */}
                <div className="md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                    <h2 className="text-xl font-bold mb-4">Upskill Now</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm">
                                Contact Number
                            </label>
                            <input
                                id="contact"
                                type="text"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                placeholder="Contact number"
                            />
                        </div>
                        <div>
                            <label htmlFor="year" className="block text-sm">
                                Graduation Year
                            </label>
                            <select
                                id="year"
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                            >
                                <option>1990</option>
                                <option>2000</option>
                                <option>2010</option>
                                <option>2020</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 p-2 rounded-md font-bold"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LiveCourse