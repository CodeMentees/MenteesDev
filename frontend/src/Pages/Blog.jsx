import React, { useEffect, useState } from 'react'
import PostCard from '../Components/Post/PostCard'
import Loading from '../Components/Helpers/Loading';
import { Link } from 'react-router-dom';

import { useBlog } from "../api/blogApi";

function Blog() {
  const { fetchLatestBlogs } = useBlog();
  const [posts,setPosts] = useState([]);

  const fetchData = async()=>{
    const postsData = await  fetchLatestBlogs(1,10)
    if(postsData){
      setPosts(postsData.data)
    }

  }

  useEffect(()=>{
    fetchData()
  },[])


if(posts.length == 0){
  return <Loading/>
}
  return (
    <div>


      <aside
        aria-label="Recent Posts"
        className="mx-auto mt-2 max-w-screen-xl py-1"
      >
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          {/* Heading */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-white  md:mb-6 lg:text-3xl">
              Most Recent Blogs
            </h2>
          </div>
          {/* /Heading */}
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {/* Article */}

            {
              posts.map(( post)=>{
                return (
                  <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                  <a
                    href="#"
                    className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                  >
                    <img
                      src=  {post.image?? "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                      loading="lazy"
                      alt=""
                      className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                    />
                  </a>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">  {post.createdAt}         </span>
                    <h2 className="text-xl font-bold text-white">
                      <a
                        href="#"
                        className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                      >
                       {post.title}
                      </a>
                    </h2>
                    <p className="text-gray-500" dangerouslySetInnerHTML={{
                __html: post. content.substring(0, 100) + "...",
              }}/>
                     
                    <div>
                      <Link
                      to={`/blogs/${post._id}`}
                        className="active:text-rose-700 font-semibold text-white transition duration-100 hover:text-rose-600"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
                )
              })
            }

     
          </div>
        </div>
      </aside>
{/* 
      <section>
        <div className="relative mx-auto max-w-lg py-10 sm:max-w-screen-lg md:max-w-screen-xl">
          <h2 className="my-4 px-4 text-4xl font-bold">Popular Posts</h2>
          <div className="mx-auto grid w-full sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                image={post.image}
                type={post.type}
                title={post.title}
                link={post.link}
              />
            ))}
          </div>
        </div>
        <svg
          className="-z-10 absolute -top-10 opacity-10"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width={20}
              height={20}
              patternTransform="scale(2) rotate(0)"
            >
              <rect x={0} y={0} width="100%" height="100%" fill="hsla(0,0%,100%,1)" />
              <path
                d="M3.25 10h13.5M10 3.25v13.5"
                strokeLinecap="square"
                strokeWidth="0.5"
                stroke="hsla(258.5,59.4%,59.4%,1)"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            width="800%"
            height="800%"
            transform="translate(0,0)"
            fill="url(#a)"
          />
        </svg>
      </section> */}

    </div>
  )
}

export default Blog