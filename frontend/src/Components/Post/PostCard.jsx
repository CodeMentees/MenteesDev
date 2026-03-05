import React from "react";


const PostCard = ({ image, type, title, link }) => {
  return (
    <article className="flex w-full p-4 duration-500 hover:bg-white hover:shadow-lg">
      <a href={link}>
        <div className="flex items-center justify-center">
          <img
            src={image}
            className="block h-auto w-full max-w-full align-middle"
            alt={type}
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <span className="py-2 text-xs font-bold">{type}</span>
          <p className="mb-4 text-xl">{title}</p>
        </div>
      </a>
    </article>
  );
};

export default PostCard;