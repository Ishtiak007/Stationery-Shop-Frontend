const About = () => {
  return (
    <div className="container mx-auto p-10 overflow-hidden">
      <div className="relative bg-[#115E59] bg-opacity-15 text-black py-16 px-6 my-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10">
          {/* Left Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-center">
              About Us
            </h1>
            <p className="text-base text-center">
              we believe in providing high-quality stationery that empowers
              creativity and productivity. From the finest paper to the most
              innovative writing tools, we offer everything you need to keep
              your ideas flowing. Whether you're a student, a professional, or
              an artist, our wide selection of products is designed to inspire
              you and help you achieve your goals.
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 font-orbitron mb-8 text-black">
        {/* Our Mission Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
          {/* Left Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary-text">
              Our Mission: o Inspire Creativity and Productivity
            </h2>
            <p className="text-lg text-primary-text">
              Our mission is to be the go-to destination for stationery
              enthusiasts and professionals alike. We are committed to offering
              a diverse range of premium stationery products that inspire
              creativity, enhance productivity, and bring joy to your everyday
              writing tasks. We prioritize customer satisfaction and aim to
              create a seamless shopping experience both online and in-store.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1611758498818-bfdeec6dc3de?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mission Image"
              className="size-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
          <div className="relative w-full  flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1569267034662-77399a614620?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Story Image"
              className="size-full object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-primary-text">
              Our Story : From Humble Beginnings to Your Trusted Stationery
              Supplier
            </h3>
            <p className="text-lg text-primary-text">
              Founded in 2012, Stationery Shop began as a small family-owned
              stationery store with a passion for high-quality products and
              exceptional service. What started as a dream to bring the finest
              paper, pens, and office supplies to the local community quickly
              grew into a trusted name among stationery lovers. Over the years,
            </p>
            <p className="text-lg text-primary-text">
              we’ve expanded our offerings to cater to all ages and professions,
              making stationery accessible, affordable, and inspiring for
              everyone.
            </p>
          </div>
        </div>
      </div>
      {/* HubSpot By The Numbers Section */}
      <div className="mt-20 text-center">
        <p className="font-black text-secondary text-lg">
          HubSpot By The Numbers
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-primary-text">
          Achievements and Growth
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center space-y-3 bg-gray-200 p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold">12</div>
            <p className="text-lg">Global Offices</p>
          </div>
          <div className="flex flex-col items-center space-y-3 bg-gray-200 p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold">20+</div>
            <p className="text-lg">Employees</p>
          </div>
          <div className="flex flex-col items-center space-y-3 bg-gray-200 p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold">205,000+</div>
            <p className="text-lg">Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
