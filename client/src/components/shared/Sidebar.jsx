/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Sidebar = ({ activeSection }) => {
  const options = [
    { name: "Result List", path: "/admin" },
    { name: "Add Result", path: "/admin/add-result" },
    { name: "Add Subjects", path: "/admin/add-subjects" },
  ];

  return (
    <div className="h-screen w-64 fixed bg-gray-800 text-gray-300 flex flex-col">
      <h2 className="text-xl font-bold text-white p-4 border-b border-gray-700">
        Admin Panel
      </h2>
      <nav className="flex-1">
        <ul>
          {options.map((option) => (
            <li
              key={option.path}
              className={`p-4 cursor-pointer ${
                activeSection === option.name
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Link to={option.path}>{option.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
