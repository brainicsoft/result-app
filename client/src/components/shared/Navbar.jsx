/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Navbar = ({ activeSection }) => {
  const options = [
    { name: "Result List", path: "/admin" },
    { name: "Add Result", path: "/admin/add-result" },
    { name: "Add Subjects", path: "/admin/add-subjects" },
  ];

  return (
    <div className="w-full bg-gray-800 text-gray-300 flex items-center px-6 py-4 shadow-md sticky top-0 z-50">
      <h2 className="text-xl font-bold text-white mr-6">Admin </h2>
      <nav className="flex-1">
        <ul className="flex space-x-4">
          {options.map((option) => (
            <li
              key={option.path}
              className={`px-4 py-2 rounded cursor-pointer ${
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
