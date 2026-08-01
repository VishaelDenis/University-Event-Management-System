import React, { useEffect, useState, useMemo } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../../../api/user";
import { useAuth } from "../../../hooks/useAuth";
import UserFilters from "./UserFilters";
import UserForm from "./UserForm";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ search: "", role: "ALL" });
    const [editingUserId, setEditingUserId] = useState(null);

    const { user: currentUser } = useAuth();

    const loadUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const search = filters.search.trim().toLowerCase();
        return users.filter((u) => {
            const matchesSearch =
                !search ||
                u.name.toLowerCase().includes(search) ||
                u.email.toLowerCase().includes(search);
            const matchesRole = filters.role === "ALL" || u.role === filters.role;
            return matchesSearch && matchesRole;
        });
    }, [users, filters]);

    const handleSaveRole = async (userId, newRole) => {
        try {
            const res = await updateUserRole(userId, newRole);
            setUsers((prev) => prev.map((u) => (u.userId === userId ? res.data : u)));
            setEditingUserId(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update role.");
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Delete this user? This cannot be undone.")) return;
        try {
            await deleteUser(userId);
            setUsers((prev) => prev.filter((u) => u.userId !== userId));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete user.");
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div>
            <h3>User Management</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <UserFilters filters={filters} onChange={setFilters} />

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Email</th>
                        <th style={cellStyle}>Role</th>
                        <th style={cellStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((u) => (
                        <React.Fragment key={u.userId}>
                            <tr>
                                <td style={cellStyle}>{u.name}</td>
                                <td style={cellStyle}>{u.email}</td>
                                <td style={cellStyle}>{u.role}</td>
                                <td style={cellStyle}>
                                    <button onClick={() => setEditingUserId(u.userId)}>Edit Role</button>{" "}
                                    <button
                                        onClick={() => handleDelete(u.userId)}
                                        disabled={currentUser && currentUser.userId === u.userId}
                                        title={
                                            currentUser && currentUser.userId === u.userId
                                                ? "You can't delete your own account"
                                                : ""
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            {editingUserId === u.userId && (
                                <tr>
                                    <td colSpan={4} style={cellStyle}>
                                        <UserForm
                                            user={u}
                                            onSave={(role) => handleSaveRole(u.userId, role)}
                                            onCancel={() => setEditingUserId(null)}
                                        />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    {filteredUsers.length === 0 && (
                        <tr>
                            <td colSpan={4} style={cellStyle}>No users match your filters.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
};

export default UserList;
