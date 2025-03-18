import { motion } from "framer-motion";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      transition={{ duration: 1 }}
      className="bg-teal-800 p-10"
    >
      <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 place-items-start gap-8 text-white">
        <div>
          <div className="flex justify-center items-center">
            <img className="size-20" src={logo} alt="logo" />
            <p className="text-xl font-semibold">Stationery Shop</p>
          </div>

          <p className=" w-[80%] lg:w-[80%] mt-3 text-center">
            Your One-Stop Shop for All Stationery Needs
          </p>
        </div>
        <div>
          <div className="font-bold mb-6">Services</div>
          <div className="flex flex-col gap-4">
            <a href="" className="text-sm hover:underline">
              Free Delivery
            </a>
            <a href="" className="text-sm hover:underline">
              Bulk Order Discounts
            </a>
            <a href="" className="text-sm hover:underline">
              {" "}
              Custom Printing & Branding
            </a>
            <a href="" className="text-sm hover:underline">
              Gift Wrapping Services
            </a>
            <a href="" className="text-sm hover:underline">
              School & Office Supply Packages
            </a>
          </div>
        </div>
        {/* .......Customer Support....... */}
        <div>
          <div className="font-bold mb-6">Customer Support</div>
          <div className="flex flex-col gap-4">
            <a href="" className="text-sm hover:underline">
              Help Center
            </a>
            <a href="" className="text-sm hover:underline">
              Return & Refund Policy
            </a>
            <a href="" className="text-sm hover:underline">
              {" "}
              Shipping & Delivery Information
            </a>
            <a href="" className="text-sm hover:underline">
              Terms & Conditions
            </a>
            <a href="" className="text-sm hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

        <div>
          <div className="font-bold mb-3">Contact Information</div>
          <h2 className="text-sm mb-4">ishtiakahmed18899@gmail.com</h2>
          <h2 className="text-sm">+8801521742729</h2>
          <div>
            <div className="font-bold my-6">
              <h1>Follow Us (Social Media)</h1>

              <div className="flex gap-4 mt-4">
                <a href="" className="hover:scale-110 text-xl">
                  <BsFacebook />
                </a>
                <a href="" className="hover:scale-110 text-xl">
                  <BsInstagram />
                </a>
                <a href="" className="hover:scale-110 text-xl">
                  <BsTwitter />
                </a>
                <a href="" className="hover:scale-110 text-xl">
                  <BsPinterest />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
