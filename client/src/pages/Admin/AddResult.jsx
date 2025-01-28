import { useState } from "react";

const AddResult = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    name: "Mahjabin Mahbub",
    dob: "01/01/1996",
    gender: "Male",
    courseName: "English",
    department: "BA Honers in English",
    passingYear: "2018",
    result: "3.50",
    publishDate:"2024-07-30"
  });

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Result</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Department/Subject:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Passing Year:</label>
          <input
            type="number"
            name="passingYear"
            value={formData.passingYear}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Result:</label>
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Result Publish Date</label>
          <input
            type="date"
            name="result"
            value={formData.publishDate}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddResult;
