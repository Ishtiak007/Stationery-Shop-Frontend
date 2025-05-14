const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-yellow-50 to-teal-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-8 px-2 sm:px-0">
          Get exclusive discounts, the latest stationery trends, and creative
          tips—delivered right to your inbox!
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-2"
        >
          <input
            type="email"
            aria-label="Email address"
            placeholder="Your email address"
            className="px-5 py-3 w-full sm:w-80 rounded-full border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 px-2">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
