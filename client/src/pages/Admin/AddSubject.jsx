import  { useState, useEffect } from "react";

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
    const response = await fetch("/data.json");
    const data = await response.json();
    setSubjects(data);
  };

  const handleEdit = (subject) => {
    setEditMode(true);
    setCurrentSubject(subject);
  };

  const handleDelete = async (id) => {
    // Replace with your actual API call
    await fetch(`/api/subjects/${id}`, { method: "DELETE" });
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  const handleUpdate = async () => {
    // Replace with your actual API call
    await fetch(`/api/subjects/${currentSubject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: currentSubject.name }),
    });
    setSubjects(
      subjects.map((subject) =>
        subject.id === currentSubject.id
          ? { ...subject, name: currentSubject.name }
          : subject
      )
    );
    setEditMode(false);
    setCurrentSubject({ id: null, name: "" });
  };

  const handleAdd = async () => {
    // Replace with your actual API call
    const response = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSubject }),
    });
    const data = await response.json();
    setSubjects([...subjects, data]);
    setNewSubject("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Subjects</h1>

      {/* Add Subject Form */}
<div className="flex items-center">
        <div className="mb-6">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter new subject"
          className="p-2 border rounded w-80"
        />
        <button
          onClick={handleAdd}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Subject
        </button>
      </div>

      {/* Edit Mode */}
      {editMode && (
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
      )}
</div>

      {/* Subjects Table */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">#</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.id} className="border-t">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{subject.name}</td>
              <td className="p-4">
                <button
                  onClick={() => handleEdit(subject)}
                  className="px-4 py-2 m-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subject.id)}
                  className="px-4 m-1 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddSubject;
