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
  const [editingService, setEditingService] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    image: "",
    description: "",
    pricing: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5011/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5011/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newService = await response.json();
      setServices([...services, newService]);
      setFormData({ name: "", image: "", description: "", pricing: "" });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDelete) {
      await fetch(`http://localhost:5011/api/services/${id}`, {
        method: "DELETE",
      });
      setServices(services.filter((service) => service._id !== id));
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5011/api/services/${editingService._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      }
    );

    if (response.ok) {
      const updatedService = await response.json();
      setServices(
        services.map((service) =>
          service._id === updatedService._id ? updatedService : service
        )
      );
      setEditingService(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard - Manage Services</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Logout
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add Service Form (existing) */}
      </form>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Service</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Service Name"
                value={editFormData.name}
                onChange={handleEditChange}
                required
                className="w-full p-2 border"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={editFormData.image}
                onChange={handleEditChange}
                required
                className="w-full p-2 border"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editFormData.description}
                onChange={handleEditChange}
                required
                className="w-full p-2 border"
              />
              <input
                type="number"
                name="pricing"
                placeholder="Pricing"
                value={editFormData.pricing}
                onChange={handleEditChange}
                required
                className="w-full p-2 border"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white p-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="flex-1 bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Existing Services</h3>
        {services.map((service) => (
          <div
            key={service._id}
            className="p-4 border rounded-lg mb-2 flex justify-between items-center"
          >
            <div className="flex items-center">
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
            <div>
              <button
                onClick={() => {
                  setEditingService(service);
                  setEditFormData({
                    name: service.name,
                    image: service.image,
                    description: service.description,
                    pricing: service.pricing,
                  });
                }}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;