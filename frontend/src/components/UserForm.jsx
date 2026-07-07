import { useEffect, useState } from "react";
import { createUser, updateUser } from "../services/user.service";

const initialState = {
  name: "",
  email: "",
  age: "",
};

export default function UserForm({
  selectedUser,
  setSelectedUser,
  fetchUsers,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        age: selectedUser.age || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedUser]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, formData);
      } else {
        await createUser(formData);
      }

      await fetchUsers();
      setFormData(initialState);
      setSelectedUser(null);
    } catch (error) {
      console.log("SAVE USER ERROR:", error.message);
    }
  }

  function handleCancel() {
    setFormData(initialState);
    setSelectedUser(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow mb-5"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedUser ? "Update User" : "user add cheyyu"}
      </h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className=" text-black px-4 py-2 rounded border "
        >
          {selectedUser ? "Update User" : "Create User"}
        </button>

        {selectedUser && (
          <button
            type="button"
            onClick={handleCancel}
            className=" text-black px-4 py-2 rounded border"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}