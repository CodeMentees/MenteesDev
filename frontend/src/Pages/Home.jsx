import React, { useEffect } from "react";
import Carousel from "../Components/Carousel/Carousel";
import WhyCodeMentees from "../Components/WhyCodeMentees/WhyCodeMentees";
import Learning from "../Components/Learning/Learing";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import CourseSection from "../Components/CourseSection/CourseSection";
import RatingSection from "../Components/RatingSection/RatingSection";
import { useCategoryAPI } from "../api/categoryApi";
import { setCategory } from "../Slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import UpcomingEvents from "../Components/Event/UpcomingEvents";

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



  return (
    <main className="overflow-x-hidden" style={{ background: "#000005" }}>

      <Carousel />
      <UpcomingEvents />
      <CourseSection />
      <Learning />
      <WhyCodeMentees />
      <BlogGridFour />
      <RatingSection />
    </main>
  );
}

export default Home;
