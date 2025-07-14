const features = [
  {
    title: "Smart Search",
    description: "Quickly find the best hotels based on your preferences.",
    icon: "🔍",
  },
  {
    title: "Prime Locations",
    description: "Stay at hotels in the most popular destinations.",
    icon: "📍",
  },
  {
    title: "Best Prices",
    description: "Get unbeatable deals and offers on top hotels.",
    icon: "💰",
  },
];

const FeatureSection = () => {
  return (
    <div className="py-16 b">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#002B5B] ">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
