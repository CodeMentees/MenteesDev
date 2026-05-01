import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Carousel from "../Components/Carousel/Carousel";
import WhyCodeMentees from "../Components/WhyCodeMentees/WhyCodeMentees";
import Learning from "../Components/Learning/Learing";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import CourseSection from "../Components/CourseSection/CourseSection";
import RatingSection from "../Components/RatingSection/RatingSection";
import { useCategoryAPI } from "../api/categoryApi";
import { setCategory } from "../Slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Helpers/Loading";
import ComprehensiveTraining from "../Components/Training/ComprehensiveTraining";
import UpcomingEvents from "../Components/Event/UpcomingEvents";
import SummerInternshipModal from "../Components/Modals/SummerInternshipModal";

function Home() {
  const { fetchCategories } = useCategoryAPI();
  const categoryData = useSelector((state) => state.category);
  const dispatch = useDispatch();


  useEffect(() => {
    // Fetch category data
    const fetchData = async () => {
      const data = await fetchCategories();
      dispatch(setCategory(data.categories));
    };

    fetchData();
  }, [dispatch]);

  if (!categoryData) return <Loading />;

  return (
    <main className="bg-dark-background pb-10 overflow-x-hidden">
      {/* JSON-LD Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "CodeMentees",
          "url": "https://codementees.com/",
          "logo": "https://codementees.com/logo.png",
          "description": "Learn coding, DSA, AI/ML, and Data Science from expert IIT/IIIT alumni. Offering live classes, certification, and placement preparation.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "offers": {
            "@type": "Offer",
            "category": "Coding Classes, AI/ML, Data Science, DSA"
          },
          "founder": {
            "@type": "Person",
            "name": "CodeMentees Team"
          },
          "sameAs": [
            "https://www.facebook.com/codementees",
            "https://twitter.com/codementees",
            "https://www.linkedin.com/company/codementees"
          ]
        })}
      </script>

      <SummerInternshipModal />
      <Carousel />
      <UpcomingEvents />
      <ComprehensiveTraining />
      <CourseSection />
      <Learning />
      <WhyCodeMentees />
      <BlogGridFour />
      <RatingSection />
    </main>
  );
}

export default Home;
