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
import WorkshopSection from "../Components/WorkshopSection/WorkshopSection";

function Home() {

  <Helmet>
    <title>Codementees - Learn Coding with Experts</title>
    <meta name="description" content="Master web development, AI, and programming with expert-led courses on Codementees." />
    <meta property="og:title" content="Codementees - Learn Coding with Experts" />
    <meta property="og:description" content="Master web development, AI, and programming with expert-led courses on Codementees." />
    <meta property="og:image" content="https://codementees.com/images/home.jpg" />
    <meta property="og:url" content="https://codementees.com/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Codementees - Learn Coding with Experts" />
    <meta name="twitter:description" content="Master web development, AI, and programming with expert-led courses on Codementees." />
    <meta name="twitter:image" content="https://codementees.com/images/twitter-home.jpg" />
  </Helmet>



  const { fetchCategories } = useCategoryAPI();
  const categoryData = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set Page Title & Meta Description for SEO
    document.title = "Codementees | Learn Coding with Experts";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Master web development, AI, and programming with expert-led courses at Codementees.");

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
          "name": "Codementees",
          "url": "https://codementees.com/",
          "description": "Learn coding from expert mentors. Get top programming courses in web development, AI, and more.",
          "sameAs": [
            "https://www.facebook.com/codementees",
            "https://twitter.com/codementees",
            "https://www.linkedin.com/company/codementees"
          ]
        })}
      </script>

      <Carousel />
      <WhyCodeMentees />
      <CourseSection />
      <Learning />
      <WorkshopSection />
      <BlogGridFour />
      <RatingSection />
    </main>
  );
}

export default Home;
