const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-yellow-50 to-teal-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-900 mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Get exclusive discounts, the latest stationery trends, and creative
          tips—delivered right to your inbox!
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center flex-wrap"
        >
          <div className="flex w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 w-72 sm:w-96 rounded-l-full border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-r-full font-semibold hover:bg-teal-700 transition"
            >
              Subscribe
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
