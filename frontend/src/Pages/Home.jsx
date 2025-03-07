import React, { useEffect } from "react";
import Carousel from "../Components/Carousel/Carousel"
import WhyCodeMentees from "../Components/WhyCodeMentees/WhyCodeMentees"
import Learning from "../Components/Learning/Learing";
import WorkshopCard from "../Components/WorkshopCard/WorkshopCard";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import CourseSection from "../Components/CourseSection/CourseSection";
import RatingSection from "../Components/RatingSection/RatingSection";
import { fetchCategory } from "../api/categoryApi"
import { setCategory } from "../Slices/categorySlice"
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Components/Helpers/Loading';

function Home() {
  const categoryData = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategory();
      dispatch(setCategory(data));
    };

    fetchData();
  }, [dispatch]);


  if (!categoryData) return <Loading/>;

  return (
    <div className="bg-dark-background pb-10 overflow-x-hidden">
      <Carousel />
      <WhyCodeMentees />
      <CourseSection />
      <Learning />
      <div className="container flex flex-nowrap  mx-auto p-4 lg:p-16 my-4 gap-4">
        <WorkshopCard
          imageUrl="https://via.placeholder.com/800x400"
          title="Upcoming Workshop: Mastering Tailwind CSS"
          description="Join us for an interactive workshop where you'll learn how to build modern, responsive websites using Tailwind CSS. Whether you're a beginner or an experienced developer, this workshop will help you level up your skills."
          date="November 15, 2023"
          time="10:00 AM - 12:00 PM"
          buttonText="Register Now"
          buttonLink="#"
        />
        <WorkshopCard
          imageUrl="https://via.placeholder.com/800x400"
          title="Upcoming Workshop: Mastering Tailwind CSS"
          description="Join us for an interactive workshop where you'll learn how to build modern, responsive websites using Tailwind CSS. Whether you're a beginner or an experienced developer, this workshop will help you level up your skills."
          date="November 15, 2023"
          time="10:00 AM - 12:00 PM"
          buttonText="Register Now"
          buttonLink="#"
        />
        <WorkshopCard
          imageUrl="https://via.placeholder.com/800x400"
          title="Upcoming Workshop: Mastering Tailwind CSS"
          description="Join us for an interactive workshop where you'll learn how to build modern, responsive websites using Tailwind CSS. Whether you're a beginner or an experienced developer, this workshop will help you level up your skills."
          date="November 15, 2023"
          time="10:00 AM - 12:00 PM"
          buttonText="Register Now"
          buttonLink="#"
        />
       
      </div>
      <BlogGridFour />
      <RatingSection />
    </div >
  )
}

export default Home