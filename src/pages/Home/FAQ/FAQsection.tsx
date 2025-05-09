import { useState } from "react";

const faqs = [
  {
    question: "What products do you offer?",
    answer:
      "We offer a wide range of stationery items including notebooks, pens, pencils, art supplies, office materials, school kits, and more – all in one place.",
  },
  {
    question: "Do you deliver to all locations?",
    answer:
      "Yes, we offer nationwide delivery. Shipping options and charges may vary depending on your location.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, items can be returned or exchanged within 7 days of purchase if they are unused and in original condition. Terms apply.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Absolutely. We use encrypted, industry-standard payment gateways to ensure your personal and payment information is safe.",
  },
  {
    question: "Can I place a bulk or custom order?",
    answer:
      "Yes! We accept bulk and custom orders for schools, offices, and events. Please contact us directly for special pricing and assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Everything you need to know about our stationery shop and how we serve
        you.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {faq.question}
              <svg
                className={`w-5 h-5 transition-transform transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
