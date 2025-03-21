import blog1 from "../../../assets/images/blog1.jpg";
import blog2 from "../../../assets/images/blog2.jpg";
import blog3 from "../../../assets/images/blog3.jpg";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
const Blog = () => {
  return (
    <div className="my-36">
      <div className="my-8">
        <h1 className="text-center font-medium lg:text-3xl text-lg">
          Our Blogs
        </h1>
        <p className="text-center text-base">
          Explore expert tips, stationery trends, and organization hacks to
          boost your creativity and productivity!
        </p>
      </div>

      <div className="lg:flex justify-center items-center gap-10">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="relative lg:size-[400px] size-[150px] rounded-lg overflow-hidden shadow-lg group">
            <img
              src={blog1}
              alt="img"
              className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <a href="">
              <div className="absolute bottom-5 left-5 right-5 bg-teal-800 bg-opacity-80 text-white p-4 rounded-lg transition-all group-hover:bg-opacity-90 group-hover:text-[#F5E7C8] group-hover:translate-y-[-10px]">
                <div className="text-sm mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <GrUserAdmin />
                    <strong className="underline">Author</strong>: Admin
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineDateRange /> 24th March 2021
                  </span>
                </div>
                <h4 className="text-lg font-semibold">
                  <p className="hover:text-[#00FFFF] transition duration-300">
                    5 Must-Have Stationery Items for Students!
                  </p>
                </h4>
                <p className="text-sm mt-1">
                  Discover the top 5 stationery essentials that every student
                  needs for a productive school year. Stay organized and boost
                  creativity!
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* blog 2 */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="relative lg:size-[400px] size-[150px] rounded-lg overflow-hidden shadow-lg group">
            <img
              src={blog2}
              alt="img"
              className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <a href="">
              <div className="absolute bottom-5 left-5 right-5 bg-teal-800 bg-opacity-80 text-white p-4 rounded-lg transition-all group-hover:bg-opacity-90 group-hover:text-[#F5E7C8] group-hover:translate-y-[-10px]">
                <div className="text-sm mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <GrUserAdmin />
                    <strong className="underline">Author</strong>: Admin
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineDateRange /> 18th August 2021
                  </span>
                </div>
                <h4 className="text-lg font-semibold">
                  <p className="hover:text-[#00FFFF] transition duration-300">
                    Choosing the Perfect Pen: A Guide for Writers & Artists
                  </p>
                </h4>
                <p className="text-sm mt-1">
                  Get ready for the new school year with this ultimate
                  stationery checklist. From notebooks to pens, we’ve got you
                  covered!
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* blog-3 */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="relative lg:size-[400px] size-[150px] rounded-lg overflow-hidden shadow-lg group">
            <img
              src={blog3}
              alt="img"
              className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <a href="">
              <div className="absolute bottom-5 left-5 right-5 bg-teal-800 bg-opacity-80 text-white p-4 rounded-lg transition-all group-hover:bg-opacity-90 group-hover:text-[#F5E7C8] group-hover:translate-y-[-10px]">
                <div className="text-sm mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <GrUserAdmin />
                    <strong className="underline">Author</strong>: Admin
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineDateRange /> 23th November 2021
                  </span>
                </div>
                <h4 className="text-lg font-semibold">
                  <p className="hover:text-[#00FFFF] transition duration-300">
                    Creative Journaling: How to Make Your Notes Stand Out?
                  </p>
                </h4>
                <p className="text-sm mt-1">
                  Learn the art of creative journaling with unique pens,
                  stickers, and highlighters. Express yourself and make learning
                  fun!
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
