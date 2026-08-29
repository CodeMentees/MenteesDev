import React from "react";
import FeatureCard from "../Card/FeatureCard";

const CardContainer = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
        <FeatureCard
          bgColor="#F48C06"
          title="Easy Scheduling & Attendance Tracking"
          description="Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance."
          delay={0}
          icon={
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
          }
        />
        <FeatureCard
          bgColor="#F48C06"
          title="Easy Scheduling &amp; Attendance Tracking"
          description="Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance."
          delay={150}
          icon={
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
          }
        />
        <FeatureCard
          bgColor="#F48C06"
          title="Customer Tracking"
          description="Automate and track emails to individuals or groups. CodeMentees ’s built-in system helps organize your organization"
          delay={300}
          icon={
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>
          }
        />

      </div>

    </>
  );
};

export default CardContainer;
