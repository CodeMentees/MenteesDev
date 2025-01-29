import React from 'react';

function WhyCodeMentees() {
  // Define the data dynamically
  const items = [
    {
      icon: "fa-chalkboard-teacher", // Represents mentors/teachers
      heading: "Superb mentors",
      description: "Best in class mentors from top Tech schools and Industry favourite Techies are here to teach you."
    },
    {
      icon: "fa-book", // Represents curriculum/learning
      heading: "Industry-vetted curriculum",
      description: "Best in class content, aligned to the Tech industry is delivered to you to ensure you are a darling of the Tech industry."
    },
    {
      icon: "fa-laptop-code", // Represents hands-on coding/projects
      heading: "Project based learning",
      description: "Hands on learning pedagogy with live projects to cover practical knowledge over theoretical one."
    },
    {
      icon: "fa-briefcase", // Represents placements/jobs
      heading: "Superb placements",
      description: "Result oriented courses with placement across all genres, students as well as Working professionals."
    },
  ];

  return (
    <section name="whycodementees" className="bg-white dark:bg-gray-900 container max-w-6xl mx-auto p-4 lg:p-12 my-10">
      <div className="mb-1 lg:mb-1 grid lg:grid-cols-4 gap-4 md:grid-cols-2">
        <h2 className="col-span-1 sm:col-span-1 mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Why CodeMentees?
        </h2>
        <div className="flex space-x-4 col-span-3">
          <div className="lg:border-l-2 border-gray-300 h-full"></div>
          <p className=" text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
      </div>

      <div data-aos="fade-right" className=" flex flex-row gap-4 py-6 overflow-x-auto">
        {/* Dynamically render items */}
        {items.map((item, index) => (
          <div key={index} className="py-4 px-3 min-w-40 text-left rounded shadow text-white border  lg:border-r-2 lg:border-y-0 lg:border-l-0 border-indigo-500">
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
