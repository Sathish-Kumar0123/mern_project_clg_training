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
    <div className="min-h-screen bg-gray-200 flex justify-center items-start p-10 font-mono">
      <div className="bg-gray-100 w-full max-w-xl p-5 rounded-lg shadow-lg">
        <h1 className="text-center underline text-2xl font-bold mb-5">
          Users List
        </h1>

        <UserForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          fetchUsers={fetchUsers}
        />

        <div className="pt-5">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            users.map((user) => (
              <ListCard
                key={user._id}
                data={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}