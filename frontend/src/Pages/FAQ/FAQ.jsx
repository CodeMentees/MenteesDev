const FAQ = () => (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">Frequently Asked Questions</h1>
      <div className="mt-6 space-y-4">
        <details className="border p-4 rounded">
          <summary className="cursor-pointer font-semibold">What services do you offer?</summary>
          <p className="mt-2 text-gray-600">We provide web development, SEO, and marketing services.</p>
        </details>
        <details className="border p-4 rounded">
          <summary className="cursor-pointer font-semibold">How can I contact support?</summary>
          <p className="mt-2 text-gray-600">You can contact us via email or the contact form.</p>
        </details>
      </div>
    </div>
  );
  
  export default FAQ;
  