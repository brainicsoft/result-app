import { useEffect, useState } from "react";

const AddResult = () => {
  const [subjects, setSubjects] = useState([]);
  // State for the form fields
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    studentId: "",
    gender: "Male",
    courseName: "",
    department: "",
    passingYear: "",
    result: "",
    publishDate: "",
  });

  // Simulated API call to fetch data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await fetch("http://localhost:5000/subjects");
    const data = await response.json();
    setSubjects(data);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // https://users-server-eta.vercel.app/
    try {
      const response = await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          publishDate: "",
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
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add Result
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="Enter student name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Student Id:</label>
              <input
                type="number"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="Enter student ID"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
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
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="Enter course name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Department:</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select Department</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
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
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="Enter passing year"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Result:</label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="Enter result"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Result Publish Date:</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
