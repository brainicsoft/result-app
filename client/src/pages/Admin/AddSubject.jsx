import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const AddSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({ id: null, name: "" });
  const [newSubject, setNewSubject] = useState("");

  // Simulated API call to fetch data
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    // Replace with your actual API call
    const response = await fetch("http://localhost:5000/subjects");
    const data = await response.json();
    setSubjects(data);
  };

  const handleEdit = (subject) => {
    setEditMode(true);
    setCurrentSubject(subject);
  };

  const handleDelete = async (id) => {
    try {
      // Show confirmation dialog before proceeding with deletion
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user confirmed the deletion
      if (result.isConfirmed) {
        // Send a DELETE request to your backend
        const response = await fetch(`http://localhost:5000/subjects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Update the state to remove the deleted subject from the list
          setSubjects(subjects.filter((subject) => subject._id !== id));

          // Show success alert
          Swal.fire({
            title: "Deleted!",
            text: "The subject has been deleted.",
            icon: "success",
          });
        } else {
          const errorData = await response.json();
          alert(`Delete failed: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("An error occurred while deleting the subject.");
    }
  };


  const handleUpdate = async () => {
    // Send PATCH request to the backend
    const response = await fetch(`http://localhost:5000/subjects/${currentSubject._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: currentSubject.name }),
    });

    const data = await response.json();

    if (data.message === "Subject updated successfully.") {
      // Update the subjects list in the UI by mapping over the subjects
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === currentSubject._id
            ? { ...subject, name: currentSubject.name } // Update the subject name
            : subject
        )
      );
      setEditMode(false); // Exit the edit mode
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Subject Updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setCurrentSubject({ _id: null, name: "" }); // Reset the current subject
    } else {
      alert(`Error: ${data.message}`);
    }
  };


  const handleAdd = async () => {
    if (!newSubject.trim()) {
      alert("Please enter a subject name.");
      return;
    }
    try {
      // Send a POST request to the backend to add a new subject
      const response = await fetch("http://localhost:5000/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubject }),
      });

      if (response.ok) {
        const newSubject = await response.json();

        // Update the subjects list to reflect the new addition
        setSubjects([...subjects, newSubject.newSubject.name]);

        // Clear the input field
        setNewSubject("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Subject added successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        const errorData = await response.json();
        alert(`Add failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("An error occurred while adding the subject.");
    }
  };

  console.log(subjects);
  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <h1 className="text-2xl font-bold mb-6">Manage Subjects</h1>

      {/* Add Subject Form */}
      <div className="flex items-center">
        <div className="mb-6 flex">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter new subject"
            className="p-2 border rounded-l-md md:rounded w-80"
          />
          <button
            onClick={handleAdd}
            className="md:ml-4 px-2 md:px-4 py-2 bg-blue-600 text-white rounded-r-md md:rounded"
          >
            Add Subject
          </button>
        </div>

        {/* Edit Mode */}
        {/* {editMode && (
          <div className="mb-6">
            <input
              type="text"
              value={currentSubject.name}
              onChange={(e) =>
                setCurrentSubject({ ...currentSubject, name: e.target.value })
              }
              className="p-2 border rounded w-80"
            />
            <button
              onClick={handleUpdate}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="ml-4 px-4 py-2 bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>

      {/* Subjects Table */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">#</th>
            <th className="p-4">Subject</th>
            <th className="p-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.i} className="border-t">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{subject.name}</td>
              <td className="p-4">
                <button
                  onClick={() => handleEdit(subject)}
                  className="px-4 min-w-20 py-2 m-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="px-4 m-1 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
            <input
              type="text"
              value={currentSubject.name}
              onChange={(e) =>
                setCurrentSubject({ ...currentSubject, name: e.target.value })
              }
              className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubject;
