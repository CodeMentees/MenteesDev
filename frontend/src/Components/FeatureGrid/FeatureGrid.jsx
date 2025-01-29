function FeatureGrid({ features }) {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-blue-500 text-3xl mb-4">
              <i className={feature.icon}></i>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid