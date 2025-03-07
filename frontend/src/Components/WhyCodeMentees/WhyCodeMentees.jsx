import React from "react";

function WhyCodeMentees() {
  const items = [
    {
      icon: "fa-chalkboard-teacher", // Represents mentors/teachers
      heading: "Superb mentors",
      description:
        "Best in class mentors from top Tech schools and Industry favourite Techies are here to teach you.",
    },
    {
      icon: "fa-book", // Represents curriculum/learning
      heading: "Industry-vetted curriculum",
      description:
        "Best in class content, aligned to the Tech industry is delivered to you to ensure you are a darling of the Tech industry.",
    },
    {
      icon: "fa-laptop-code", // Represents hands-on coding/projects
      heading: "Project based learning",
      description:
        "Hands on learning pedagogy with live projects to cover practical knowledge over theoretical one.",
    },
    {
      icon: "fa-briefcase", // Represents placements/jobs
      heading: "Superb placements",
      description:
        "Result oriented courses with placement across all genres, students as well as Working professionals.",
    },
  ];

  return (
    <section
      name="whycodementees"
      className="bg-dark-box text-dark-text container max-w-6xl mx-auto p-4 lg:p-12 my-10"
    >
      <div className="mb-1 lg:mb-1 grid lg:grid-cols-4 gap-4 md:grid-cols-2">
        <h2 className="col-span-1 px-2 sm:col-span-1 mb-4  lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Why CodeMentees?
        </h2>
        <div className="flex space-x-2 col-span-3">
          <div className="lg:border-l-2 border-blue-900 h-full"></div>
          <p className=" text-dark-text sm:text-md ">
            Our platform is designed to help you master coding with expert-led
            mentorship, practical courses, and real-world projects. Whether
            you're a beginner or an experienced developer, we provide the
            guidance, resources, and community support to accelerate your
            learning and career growth. Start coding smarter today!
          </p>
        </div>
      </div>

      <div
        data-aos="fade-right"
        className=" flex flex-row gap-4 py-6 mx-2 lg:mx-0 overflow-x-auto"
      >
        {/* Dynamically render items */}
        {items.map((item, index) => (
          <div
            key={index}
            className="py-4 px-3 min-w-40 text-left  text-white border  lg:border-r-2 lg:border-y-0 lg:border-l-0 border-blue-900"
          >
            <div className="text-dark-accent text-4xl mb-2">
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h2 className="text-lg font-bold mb-2">{item.heading}</h2>
            <p className="text-dark-text">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyCodeMentees;
