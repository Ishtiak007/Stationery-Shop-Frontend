import { FaUsers, FaCity } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { LiaHandPeace } from "react-icons/lia";

export default function StatsSection() {
  const stats = [
    {
      icon: <TbCategory className="text-teal-500 text-2xl" />,
      value: "11+",
      label: "Categories",
    },
    {
      icon: <FaUsers className="text-teal-500 text-2xl" />,
      value: "55+",
      label: "Active Members",
    },
    {
      icon: <LiaHandPeace className="text-teal-500 text-2xl" />,
      value: "95%",
      label: "Satisfaction Rate",
    },
    {
      icon: <FaCity className="text-teal-500 text-2xl" />,
      value: "22",
      label: "Cities Covered",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-teal-100 p-4 rounded-full mb-4">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
