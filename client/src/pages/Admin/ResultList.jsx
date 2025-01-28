import moment from "moment";
import { useEffect, useState } from "react";

const ResultList = () => {
  const [results, setResult] = useState(null); // To store the fetched result


  // Simulated API call to fetch data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    // Replace with your actual API call
    const response = await fetch("http://localhost:5000/results");
    const data = await response.json();
    setResult(data);
  };

  // const students = [
  //   {
  //     name: "Mahjabin Mahbub",
  //     dob: "01/01/1996",
  //     gender: "Male",
  //     courseName: "English",
  //     department: "BA Honers in English",
  //     passingYear: "2018",
  //     result: "3.50",
  //     publishDate: "2024-07-30"
  //   },
  //   {
  //     name: "John Doe",
  //     dob: "15/02/1995",
  //     gender: "Male",
  //     courseName: "Computer Science",
  //     department: "B.Sc (Hons) in Computer Science",
  //     passingYear: "2017",
  //     result: "3.75",
  //     publishDate: "2024-07-29"
  //   },
  //   {
  //     name: "Jane Smith",
  //     dob: "12/05/1994",
  //     gender: "Female",
  //     courseName: "Mathematics",
  //     department: "B.Sc (Hons) in Mathematics",
  //     passingYear: "2019",
  //     result: "3.80",
  //     publishDate: "2024-07-28"
  //   },
  //   {
  //     name: "Ali Khan",
  //     dob: "10/03/1997",
  //     gender: "Male",
  //     courseName: "Physics",
  //     department: "B.Sc (Hons) in Physics",
  //     passingYear: "2020",
  //     result: "3.60",
  //     publishDate: "2024-07-27"
  //   },
  //   {
  //     name: "Sara Ahmed",
  //     dob: "20/09/1998",
  //     gender: "Female",
  //     courseName: "Biology",
  //     department: "B.Sc (Hons) in Biology",
  //     passingYear: "2021",
  //     result: "3.90",
  //     publishDate: "2024-07-26"
  //   }
  // ];
  console.log(results);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Results List</h1>

      <table className="w-full bg-white rounded shadow">
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
          {results?.map((student, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.courseName}</td>
              <td className="p-4">{student.department}</td>
              <td className="p-4">{student.result}</td>
              <td className="p-4">{moment(student.publishDate).format('D MMMM YYYY')}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultList;
