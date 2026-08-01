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

    if (loading) return <p className="loading-text">Loading users...</p>;

    const roleBadge = (role) => {
        const cls = role === "ADMIN" ? "badge badge-danger"
            : role === "ORGANIZER" ? "badge badge-warning"
            : "badge badge-success";
        return <span className={cls}>{role}</span>;
    };

    return (
        <div>
            {error && <div className="auth-error">{error}</div>}
            <UserFilters filters={filters} onChange={setFilters} />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <React.Fragment key={u.userId}>
                                <tr>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{roleBadge(u.role)}</td>
                                    <td>
                                        <button className="btn btn-warning-sm" onClick={() => setEditingUserId(u.userId)}>Edit Role</button>{" "}
                                        <button
                                            className="btn btn-danger-sm"
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
                                        <td colSpan={4} style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)" }}>
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
                                <td colSpan={4} className="table-empty">No users match your filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
