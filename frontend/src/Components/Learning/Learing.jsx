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
                icon: "fa-solid   fa-user-group",
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
        <section data-aos="fade-right" name="chooselearn" className="bg-dark-box  container max-w-6xl mx-auto p-4 lg:p-12  my-10">
            <h2 className="mb-4  lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Choose how you learn!
            </h2>
            <p className="mb-4 text-dark-text">
                Each learner has their own manner of learning, and one model of teaching does not fit all.
                At Coding Blocks, we realize this and therefore deliver programs in Classroom, Live interactive,
                and Online guided learning models.
            </p>


            {/* Tab Headers */}
            <div className="text-sm font-medium text-center text-gray-200 border-b border-gray-200 ">
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
            <div className="my-4">
                <div className="gap-6 items-center py-4  px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-4 py-16  lg:py-4 lg:px-0  ">
                    <img
                        className="w-full dark:block col-span-1"
                        src="https://cdn.pixabay.com/photo/2024/12/28/01/27/ai-generated-9295105_1280.jpg"
                        alt="Dashboard Mockup"
                    />
                    <div className="mt-4 md:mt-0 col-span-3">
                        <FeatureGrid features={currentFeatures} />
                    </div>
                </div>
                <button className="  px-7  py-3 bg-dark-btn text-dark-text  rounded-lg     overflow-hidden text-sm">See All</button>
            </div>
        </section>
    );
}

export default Learning;
