import blog1 from "../../../assets/images/blog1.jpg";
import blog2 from "../../../assets/images/blog2.jpg";
import blog3 from "../../../assets/images/blog3.jpg";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";

const blogs = [
  {
    img: blog1,
    title: "5 Must-Have Stationery Items for Students!",
    date: "24th March 2021",
    description:
      "Discover the top 5 stationery essentials that every student needs for a productive school year. Stay organized and boost creativity!",
  },
  {
    img: blog2,
    title: "Choosing the Perfect Pen: A Guide for Writers & Artists",
    date: "18th August 2021",
    description:
      "Get ready for the new school year with this ultimate stationery checklist. From notebooks to pens, we’ve got you covered!",
  },
  {
    img: blog3,
    title: "Creative Journaling: How to Make Your Notes Stand Out?",
    date: "23rd November 2021",
    description:
      "Learn the art of creative journaling with unique pens, stickers, and highlighters. Express yourself and make learning fun!",
  },
];

const Blog = () => {
  return (
    <div className="my-24 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Our Blogs</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore expert tips, stationery trends, and organization hacks to
          boost your creativity and productivity!
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative overflow-hidden h-60">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <GrUserAdmin />
                  <span className="font-semibold">Admin</span>
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineDateRange />
                  {blog.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-700 transition">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.description}
              </p>
              <a
                href="#"
                className="inline-block mt-2 text-teal-600 font-medium hover:underline text-sm"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
