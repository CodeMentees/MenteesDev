function FeatureGrid({ features }) {
  return (
    <section className=" mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 border-2 font-serif  border border-blue-900 rounded-lg shadow-md shadow-indigo-700  transition"
          >
            <div className="text-dark-accent  text-3xl mb-4">
              <i className={feature.icon}></i>
            </div>
            <p className="text-gray-600 font-serif font-bold dark:text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid