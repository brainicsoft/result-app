import { useEffect, useState } from "react";

const AddResult = () => {
  const [subjects, setSubjects] = useState([]);
  // State for the form fields
  const [formData, setFormData] = useState({
    name: "Mahjabin Mahbub",
    dob: "01/01/1996",
    studentId: "1234567890",
    gender: "Male",
    courseName: "English",
    department: "BA Honers in English",
    passingYear: "2018",
    result: "3.50",
    publishDate: "2024-07-30"
  });

  // Simulated API call to fetch data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    // Replace with your actual API call or mock data
    const response = await fetch("http://localhost:5000/subjects");
    const data = await response.json();
    setSubjects(data);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert("Result added successfully!");
        // Optionally, reset the form fields after submission
        setFormData({
          name: "",
          dob: "",
          studentId: "",
          gender: "Male",
          courseName: "",
          department: "",
          passingYear: "",
          result: "",
          publishDate: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Result</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md container mx-auto">
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
          <label className="block text-sm font-semibold mb-2">Student Id:</label>
          <input
            type="number"
            name="studentId"
            value={formData.studentId}
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

        <div className="mb-6">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            id="department"
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 border rounded "
            required
          >
            <option value="">Select Department</option>
            {subjects.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
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
          <label className="block text-sm font-semibold mb-2">Result Publish Date:</label>
          <input
            type="date"
            name="publishDate"
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
