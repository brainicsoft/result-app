import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [studentID, setStudentID] = useState("");
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student ID:", studentID);
    console.log("Department:", department);
  };

  const fetchSubjects = async () => {
    // Replace with your actual API call
    const response = await fetch("/data.json");
    const data = await response.json();
    setSubjects(data);
  };

  useEffect(()=>{
    fetchSubjects();
  },[])
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-[#DFF0FB] border border-gray-400 p-8 w-[90%] md:w-[800px] shadow-lg"
      >
        <h1 className="text-2xl text-red-600 font-bold text-center mb-6">Final Result (CGPA Result)</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentID" className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <input
              type="text"
              id="studentID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Student ID"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
