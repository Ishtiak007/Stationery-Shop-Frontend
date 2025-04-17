import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMap,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-10 overflow-hidden">
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: 'url("https://via.placeholder.com/1500x500")', // Replace with actual background image URL
          }}
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="mt-4 text-lg">Connect with us to know better</p>
          </div>
        </div>

        {/* Contact Info and Form Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 px-5">
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4 font-sans">Contact Info</h2>

            <ul className="space-y-4">
              <li className="flex items-center justify-center lg:justify-start">
                <FaMailBulk size={24} className="mr-4 text-blue-600" />
                <span className="text-lg">ishtiak.sparrow98@gmail.com</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaPhone size={24} className="mr-4 text-green-600" />
                <span className="text-lg">+123 888 888 888</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaMap size={24} className="mr-4 text-red-600" />
                <span className="text-lg">
                  12345 Dhk St, Stationery Shop, BK 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2">
            <form className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col">
                <label className="text-lg font-semibold">Name</label>
                <input
                  type="text"
                  name="user_name"
                  className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold">Message</label>
                <textarea
                  name="message"
                  className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Section (Optional) */}
        <div className="bg-gray-200 py-10">
          <div className="text-center">
            <p className="text-lg text-gray-600">Follow Us on Social Media</p>
            <div className="flex justify-center space-x-8 mt-4">
              <FaFacebook
                href="https://facebook.com"
                className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
              />
              <FaTwitter
                href="https://twitter.com"
                className="text-blue-500 hover:text-blue-800 cursor-pointer text-xl"
              />
              <FaInstagram
                href="https://instagram.com"
                className="text-pink-500 hover:text-red-500 cursor-pointer text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
