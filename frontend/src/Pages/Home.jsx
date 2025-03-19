import React, { useEffect } from "react";
import Carousel from "../Components/Carousel/Carousel";
import WhyCodeMentees from "../Components/WhyCodeMentees/WhyCodeMentees";
import Learning from "../Components/Learning/Learing";
import WorkshopCard from "../Components/WorkshopCard/WorkshopCard";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import CourseSection from "../Components/CourseSection/CourseSection";
import RatingSection from "../Components/RatingSection/RatingSection";
import { useCategoryAPI } from "../api/categoryApi";

import { setCategory } from "../Slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Helpers/Loading";
import WorkshopSection from "../Components/WorkshopSection/WorkshopSection";

function Home() {
  const { fetchCategories } = useCategoryAPI();
  const categoryData = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      dispatch(setCategory(data.categories));
    };

    fetchData();
  }, [dispatch]);

  if (!categoryData) return <Loading />;

  return (
    <div  className="bg-dark-background pb-10 overflow-x-hidden">
      <Carousel />
      <WhyCodeMentees />
      <CourseSection />
      <Learning />
      <WorkshopSection />
      <BlogGridFour />
      <RatingSection />
    </div>
  );
}

export default Home;
