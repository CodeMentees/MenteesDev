import React, { useState } from 'react';
import FeatureGrid from '../FeatureGrid/FeatureGrid';
function Learning() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "Referrals", key: "referrals" },
        { label: "Peer Group", key: "peer_group" },
        { label: "Interviews", key: "interviews" },
        { label: "Support", key: "support" },
    ];

    const featuresData = {
        referrals: [
            {
                icon: "fa-solid fa-handshake",
                description: "Referrals for Placements and internships",
            },
            {
                icon: "fa-solid fa-clipboard-check",
                description: "Continuous feedback & monitoring",
            },
        ],
        peer_group: [
            {
                icon: "fa-solid fa-people-group",
                description: "Awesome Peer group",
            },
            {
                icon: "fa-solid fa-laptop-code",
                description: "In-class Hackathons & Assignment sessions",
            },
        ],
        interviews: [
            {
                icon: "fa-solid fa-microphone",
                description: "Mock interviews",
            },
            {
                icon: "fa-solid fa-check-circle",
                description: "100% Course completion",
            },
        ],
        support: [
            {
                icon: "fa-solid fa-question-circle",
                description: "Dedicated Doubt support",
            },
            {
                icon: "fa-solid fa-briefcase",
                description: "Dedicated Placement support",
            },
        ],
    };

    const currentFeatures = featuresData[tabs[activeTab].key];

    return (
        <section data-aos="fade-right" name="chooselearn" className=" container max-w-6xl mx-auto px-6 my-6  lg:my-10 tracking-tight font-extrabold">
            <h2 className="mb-4  lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Choose how you learn!
            </h2>
            <p className="mb-4 text-gray-500 sm:text-xl dark:text-gray-400">
                Each learner has their own manner of learning, and one model of teaching does not fit all.
                At Coding Blocks, we realize this and therefore deliver programs in Classroom, Live interactive,
                and Online guided learning models.
            </p>


            {/* Tab Headers */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-nowrap overflow-x-auto -mb-px">
                    {tabs.map((tab, index) => (
                        <li key={index} className="mr-2">
                            <button
                                onClick={() => setActiveTab(index)}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === index
                                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="gap-6 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-4 sm:py-16 lg:px-6">
                    <img
                        className="w-full dark:block col-span-1"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                        alt="Dashboard Mockup"
                    />
                    <div className="mt-4 md:mt-0 col-span-3">
                        <FeatureGrid features={currentFeatures} />
                    </div>
                </div>
                <button className="relative inline-flex items-center justify-center px-5 py-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">See All</button>
            </div>
        </section>
    );
}

export default Learning;
