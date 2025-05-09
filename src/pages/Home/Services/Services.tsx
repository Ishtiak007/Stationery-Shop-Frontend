import { CiPen } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";
import { IoSchoolOutline } from "react-icons/io5";
const Services = () => {
  return (
    <div>
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h5 className="text-lg font-semibold text-teal-800 uppercase">
              Services
            </h5>
            <h2 className="text-3xl font-bold text-gray-800">
              We Provide Services
            </h2>
            <p className="text-gray-600 mt-2">
              Discover high-quality stationery and office essentials to boost
              productivity and creativity.
            </p>
          </div>

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-[#115E59] text-5xl mb-4">
                <CiPen />
              </div>
              <h5 className="text-xl font-semibold mb-2">Premium Pens</h5>
              <p className="text-gray-600">
                Smooth, high-quality pens for professionals, students, and
                artists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-[#115E59] text-5xl mb-4">
                <LuNotebookPen />
              </div>
              <h5 className="text-xl font-semibold mb-2">Custom Notebooks</h5>
              <p className="text-gray-600">
                Personalized notebooks designed for journaling, planning, and
                sketching.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-[#115E59] text-5xl mb-4">
                <IoSchoolOutline />
              </div>
              <h5 className="text-xl font-semibold mb-2">Office Essentials</h5>
              <p className="text-gray-600">
                High-quality office supplies to create an efficient workspace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
