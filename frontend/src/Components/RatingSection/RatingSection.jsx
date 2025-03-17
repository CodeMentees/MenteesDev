import React from 'react'

function RatingSection() {
    return (
        <div data-aos="fade-right" className="bg-dark-background border-blue-900 border shadow-sm shadow-indigo-700  text-dark-text container max-w-6xl mx-auto p-4 lg:p-12 my-10">
            {/* Heading */}
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-20 ">
                <h2 className="lg:text-3xl tracking-tight font-extrabold text-dark-h  mb-2 lg:mb-6">
                    Talk to our Learning Consultant!
                </h2>
                <div className="mb:4 lg:mb-8">
                    <p className="text-gray-100 mb-2">Contact Number</p>
                    <p className="text-3xl font-semibold text-dark-primary">1800-274-4504</p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="mb-8">
                <p className=" mb-4  text-gray-100">
                    Get a free counselling session from our experts
                </p>
                <button className="w-full sm:w-auto px-6 py-3 bg-dark-btn text-white font-semibold rounded-lg  transition duration-300">
                    Let us call you
                </button>
            </div>
            {/* Reviews Section */}
            <div className="border-t pt-8 text-gray-100">
                <h3 className="text-xl font-bold  mb-4">Our Reviews</h3>
                <p className="mb-4">
                    We love our students as much as they love us!
                </p>
                {/* Ratings */}
                <div className="flex items-center space-x-6 mb-4">
                    <div className="text-center">
                        <p className="text-xl lg:text-4xl font-bold text-blue-600">4.8</p>
                        <p className="text-sm ">Rating</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl lg:text-4xl font-bold text-blue-600">4.7</p>
                        <p className="text-sm">Satisfaction</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl lg:text-4xl font-bold text-blue-600">100+</p>
                        <p className="text-sm ">Questions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingSection