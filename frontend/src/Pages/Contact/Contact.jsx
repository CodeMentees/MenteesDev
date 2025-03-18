const Contact = () => (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
      <p className="mt-4 text-gray-600">Get in touch with us.</p>
      <form className="mt-6 space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
        <textarea placeholder="Your Message" className="w-full p-2 border rounded"></textarea>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
  
  export default Contact;
  