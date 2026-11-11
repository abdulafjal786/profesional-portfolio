import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://192.168.1.11:8000/home/Amosta-view/");
        const json = await result.json();

        // Sort by ID descending
        const sortedData = json.response.sort((a, b) => b.id - a.id);
        setData({ ...json, response: sortedData });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const toggleMessage = (id) => {
    setExpandedMessageId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="w-full bg-white shadow-sm rounded-lg p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.response.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.full_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.mobile}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.subject}</td>
                    <td
                      className="px-4 py-3 text-sm text-gray-500 cursor-pointer"
                      onClick={() => toggleMessage(lead.id)}
                    >
                      {expandedMessageId === lead.id
                        ? lead.message
                        : lead.message.length > 50
                        ? lead.message.slice(0, 50) + "..."
                        : lead.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
