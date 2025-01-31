import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    pricing: "",
  });
  const navigate = useNavigate();

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  // Fetch services only for logged-in user
  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5011/api/services?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, [userEmail, navigate]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5011/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, email: userEmail }), // Attach email instead of userId
    });

    if (response.ok) {
      const newService = await response.json();
      setServices([...services, newService]);
      setFormData({ name: "", image: "", description: "", pricing: "" });
    } else {
      const errorMsg = await response.text();
      console.error("🔥 Error adding service:", errorMsg);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5011/api/services/${id}`, { method: "DELETE" });
    setServices(services.filter((service) => service._id !== id));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard - Manage Services</h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Logout
      </button>

      {/* Form to Add Services */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          type="number"
          name="pricing"
          placeholder="Pricing"
          value={formData.pricing}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Add Service
        </button>
      </form>

      {/* Display Existing Services */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Existing Services</h3>
        {services.map((service) => (
          <div
            key={service._id}
            className="p-4 border rounded-lg mb-2 flex justify-between items-center"
          >
            <div className="flex items-center">
              {/* Display the image */}
              <img
                src={service.image}
                alt={service.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{service.name}</h4>
                <p>{service.description}</p>
                <p className="text-gray-600">Price: ${service.pricing}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(service._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
