

const AboutUs = () => {
  return (
    <div className="bg-gray-100 mx-auto rounded-lg min-h-screen mt-3 border-2 border-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-gray-300 mt-2">Your trusted stationery partner</p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Who We Are */}
        <div className="bg-white shadow-lg rounded-lg p-6 my-6">
          <h2 className="text-2xl font-semibold text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mt-2">
            Welcome to **Stationery Shop**, your go-to destination for premium stationery items. 
            We offer a wide range of products, including notebooks, pens, art supplies, and office essentials. 
            Our goal is to provide high-quality stationery at affordable prices.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white shadow-lg rounded-lg p-6 my-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            At **Stationery Shop**, we are committed to enhancing creativity and productivity by 
            offering the best stationery products. We believe that the right tools can inspire great work, 
            and we strive to bring you the finest supplies with exceptional service.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-lg rounded-lg p-6 my-6">
          <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>Wide range of stationery and office supplies</li>
            <li>High-quality products at the best prices</li>
            <li>Customer satisfaction is our priority</li>
            <li>Fast and reliable delivery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
