
import { useState } from "react";
import { CSharp, Designer } from "../assets/mainPage"
import Carousel from "../Components/Carousel/Carousel"
import CourseCard from "../Components/CourseSubject/CourseCard";
import Header from "../Components/Header/Header";
import WhyCodeMentees from "../Components/WhyCodeMentees/WhyCodeMentees"
function Home() {


  const [activeTab, setActiveTab] = useState(0);

  const coursesData = [
    {
      category: "Competitive Programming",
      courses: [
        {
          id: 0,
          name: "C++ Master Data structures and Algorithms using C++",
          image: CSharp,
          tags: [
            { label: "Classroom", bgColor: "blue", textColor: "blue" },
            { label: "Online", bgColor: "gray", textColor: "gray" },
            { label: "Live", bgColor: "red", textColor: "red" },
          ],
          features: ["2 team members", "20GB Cloud storage", "Integration help"],
        },
        {
          id: 1,
          name: "Python Mastering Data Structures and Algorithms",
          image: CSharp,  // Replace with another image if necessary
          tags: [
            { label: "Classroom", bgColor: "blue", textColor: "blue" },
            { label: "Online", bgColor: "gray", textColor: "gray" },
          ],
          features: ["3 team members", "30GB Cloud storage", "Expert mentorship"],
        },
        {
          id: 1,
          name: "Python Mastering Data Structures and Algorithms",
          image: CSharp,  // Replace with another image if necessary
          tags: [
            { label: "Classroom", bgColor: "blue", textColor: "blue" },
            { label: "Online", bgColor: "gray", textColor: "gray" },
          ],
          features: ["3 team members", "30GB Cloud storage", "Expert mentorship"],
        },
      ],
    },
    {
      category: "Interview Preparation",
      courses: [
        {
          id: 2,
          name: "JavaScript Full Stack Development",
          image: CSharp,  // Replace with another image
          tags: [
            { label: "Online", bgColor: "green", textColor: "green" },
            { label: "Live", bgColor: "red", textColor: "yellow" },
          ],
          features: ["5 team members", "50GB Cloud storage", "Project-based learning"],
        },
        {
          id: 3,
          name: "System Design Concepts for Interviews",
          image: CSharp,  // Replace with another image
          tags: [
            { label: "Online", bgColor: "red", textColor: "yellow" },
            { label: "Live", bgColor: "orange", textColor: "orange" },
          ],
          features: ["1 on 1 mentoring", "40GB Cloud storage", "Mock interviews"],
        },
      ],
    },
  ];

  // Tab navigation data
  const tabs = [
    { id: 0, label: "Competitive Programming", image: CSharp },
    { id: 1, label: "Interview Preparation", image: CSharp },
  ];


  return (
    <div className="bg-gray-700">

      <Header />
      <Carousel />
      <WhyCodeMentees />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Courses based on subjects</h2>
          <p class="mb-4 dark:text-white">Learn and grow as a developer with our Result oriented pedagogy and project based learning..</p>

          <div>
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap gap-8 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {tabs.map((tab) => (
                  <li key={tab.id} className="me-2">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`m items-center justify-center p-4 border-b-2 ${activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        } rounded-t-lg group`}
                    >
                      <img src={tab.image} alt={tab.label} className="w-6 h-6 mr-2" />
                      <p className="mt-2">{tab.label}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {/* Render the courses based on activeTab */}
              {activeTab === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesData[0].courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesData[1].courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section >

      <section className="bg-white dark:bg-gray-900 container mx-auto p-12 my-10">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Choose how you learn!</h2>
        <p class="mb-4 dark:text-white">Each learner has his or her own manner of learning and one model of teaching is not fit for all. At Coding Blocks, we realise this and therefore deliver programs in Classroom, Live interactive and Online guided learning models.</p>

      </section>



    </div >
  )
}

export default Home