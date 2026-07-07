import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import UserForm from "../components/UserForm";
import { getUsers, deleteUser } from "../services/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchUsers() {
    try {
      const response = await getUsers();

      console.log("FULL RESPONSE:", response.data);

      const userList = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setUsers(userList || []);
    } catch (error) {
      console.log("GET USERS ERROR:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteUser(id);
      await fetchUsers();

      if (selectedUser?._id === id) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.log("DELETE ERROR:", error.message);
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                👥 User Management
              </h1>

              <p className="text-gray-500 mt-2">
                Add, edit and manage your application users.
              </p>
            </div>

            <div className="mt-5 md:mt-0 bg-cyan-100 text-cyan-700 px-6 py-4 rounded-2xl shadow text-center">
              <p className="text-sm font-semibold">
                Total Users
              </p>

              <h2 className="text-3xl font-bold">
                {users.length}
              </h2>
            </div>

          </div>
        </div>

        {/* User Form */}
        <UserForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          fetchUsers={fetchUsers}
        />

        {/* Users List */}
        <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              📋 Users List
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {users.length} Users
            </span>
          </div>

          {users.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-7xl mb-4">
                👤
              </div>

              <h3 className="text-2xl font-bold text-gray-700">
                No Users Found
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first user using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {users.map((user) => (
                <ListCard
                  key={user._id}
                  data={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
