import React from 'react';

function WhyCodeMentees() {
  // Define the data dynamically
  const items = [
    { icon: "fa-user", heading: "Heading 1", description: "This is a description for item 1. Add any content you like here." },
    { icon: "fa-cogs", heading: "Heading 2", description: "This is a description for item 2. Add any content you like here." },
    { icon: "fa-users", heading: "Heading 3", description: "This is a description for item 3. Add any content you like here." },
    { icon: "fa-chart-line", heading: "Heading 4", description: "This is a description for item 4. Add any content you like here." },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 container mx-auto p-12 my-10">
      <div className="mb-1 lg:mb-1 grid grid-cols-4 gap-4">
        <h2 className="col-span-1 mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Why CodeMentees?
        </h2>
        <div className="flex space-x-4 col-span-3">
          <div className="border-l-2 border-gray-300 h-full"></div>
          <p className=" text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 p-6">
        {/* Dynamically render items */}
        {items.map((item, index) => (
          <div key={index} className="p-4 rounded shadow text-center text-white border-r-4 border-indigo-500">
            <div className="text-blue-500 text-4xl mb-2">
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h2 className="text-lg font-bold mb-2">{item.heading}</h2>
            <p className="text-white-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyCodeMentees;
