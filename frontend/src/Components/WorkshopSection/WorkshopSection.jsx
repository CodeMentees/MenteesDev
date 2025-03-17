import React, { useEffect, useState } from "react";
import WorkshopCard from "../WorkshopCard/WorkshopCard";
import { fetchEvents } from "../../api/eventApi";
import Event from "../../../../backend/models/event";
import Loading from "../Helpers/Loading";

function WorkshopSection() {
  const [Events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents();
      setEvents(data.events);
    };
    fetchData();
  }, []);
  return Events.length == 0 ? (
    <Loading />
  ) : (
    <div className=" p-4  gap-4  max-w-6xl mx-auto p-4 lg:p-0 my-10">
      <h2 className="col-span-1  sm:col-span-1 mb-4  lg:text-3xl tracking-tight font-extrabold text-dark-h">
        Events
      </h2>
      <div className=" flex lg:flex-row flex-col  gap-10 items-center flex-nowrap  mx-auto">
        {Events.map((event) => {
          return (
            <WorkshopCard
              imageUrl={event.image}
              title={event.title}
              description={event.description}
              date={new Date(event.startDate).toISOString().split("T")[0]}
              time={event.time}
              buttonText="Register Now"
              buttonLink={event.link ?? "#"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WorkshopSection;
