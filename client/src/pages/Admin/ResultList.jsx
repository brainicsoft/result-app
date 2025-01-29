import moment from "moment";
import { useState, useEffect } from "react";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    course: "",
    department: "",
    result: "",
  });

  // Fetch the data on initial render
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await fetch("http://localhost:5000/results");
    const data = await response.json();
    setResults(data);
    setFilteredResults(data); // Set initial filtered results to all
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Filter the results based on selected filter criteria
  const applyFilters = () => {
    const filtered = results.filter((student) => {
      return (
        (filter.course === "" || student.courseName.toLowerCase().includes(filter.course.toLowerCase())) &&
        (filter.department === "" || student.department.toLowerCase().includes(filter.department.toLowerCase())) &&
        (filter.result === "" || student.result.toString().includes(filter.result))
      );
    });
    setFilteredResults(filtered);
  };

  // Trigger filtering when the user changes any filter input
  useEffect(() => {
    applyFilters();
  }, [filter]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Results List</h1>

      {/* Filter Section - Dropdowns in one line */}
      <div className="flex flex-wrap gap-4 mb-6 justify-start">
        {/* Course Filter */}
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="course" className="text-sm font-medium mb-2">Course</label>
          <select
            id="course"
            name="course"
            value={filter.course}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Course</option>
            {results.map((student) => (
              <option key={student.courseName} value={student.courseName}>
                {student.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="department" className="text-sm font-medium mb-2">Department</label>
          <select
            id="department"
            name="department"
            value={filter.department}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Department</option>
            {results.map((student) => (
              <option key={student.department} value={student.department}>
                {student.department}
              </option>
            ))}
          </select>
        </div>

        {/* Result Filter */}
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="result" className="text-sm font-medium mb-2">Result</label>
          <select
            id="result"
            name="result"
            value={filter.result}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Result</option>
            {results.map((student) => (
              <div key={student._id}>
                <option value={student.result}>
                  {student.result}
                </option>
              </div>
            ))}
          </select>
        </div>
      </div>

      {/* Table - Make the table scrollable on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Course</th>
              <th className="p-4">Department</th>
              <th className="p-4">Result</th>
              <th className="p-4">Publish Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length > 0 ? (
              filteredResults.map((student, index) => (
                <tr key={student._id} className="border-t">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.courseName}</td>
                  <td className="p-4">{student.department}</td>
                  <td className="p-4">{student.result}</td>
                  <td className="p-4">{moment(student.publishDate).format('D MMMM YYYY')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultList;
