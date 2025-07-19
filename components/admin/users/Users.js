// /app/users/page.jsx
'use client';

import { useEffect, useState } from 'react';
import styles from './users.module.css';
import toast from 'react-hot-toast';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState({});
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isEditing, setIsEditing] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    
    // Changed from days to date range
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchUsers = async () => {
        const res = await fetch('/api/user/get-users');
        const data = await res.json();
        setUsers(data?.users);
    };

    useEffect(() => {
        fetchUsers();
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUser(user);
        }
        
        // Set default date range (last 30 days)
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        setEndDate(today.toISOString().split('T')[0]);
        setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    }, []);

    const handleDelete = async (id) => {
        if (!verified) return toast.error('Please verify OTP first');
        await fetch(`/api/user/delete-user?id=${id}&token=${currentUser?.token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        fetchUsers();
        setPopupVisible(false);
    };

    const handleEdit = async () => {
        if (!verified) return toast.error('Please verify OTP first');
        await fetch(`/api/user/update-user?token=${currentUser?.token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        });
        fetchUsers();
        setPopupVisible(false);
    };

    const handleCreate = async () => {
        if (!verified) return toast.error('Please verify OTP first');
        await fetch(`/api/user/create-user?token=${currentUser?.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        });
        fetchUsers();
        setPopupVisible(false);
    };

    const openPopup = (user = {}, editing = false, creating = false) => {
        setSelectedUser(user);
        setIsEditing(editing);
        setIsCreating(creating);
        setPopupVisible(true);
        setVerified(false);
        setOtpSent(false);
        setOtp('');
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedUser({});
        setIsCreating(false);
        setOtp('');
        setOtpSent(false);
        setVerified(false);
    };

    const sendOtp = async () => {
        try {
            const res = await fetch(`/api/twilio/send-otp?phone=9719250693`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();
            if (data.success) {
                toast.success("OTP sent successfully");
                setOtpSent(true);
            } else {
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            toast.error("An error occurred while sending OTP");
            console.log(error);
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await fetch(`/api/twilio/verify-otp?phone=9719250693&code=${otp}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();
            if (data.success) {
                setVerified(true);
                toast.success("VERIFIED");
            } else {
                toast.error("Error verifying OTP");
                setVerified(false);
            }
        } catch (error) {
            toast.error("Error verifying OTP");
            setVerified(false);
        }
    };

    const exportData = async (dataType) => {
        // Validate date range
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates");
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Start date cannot be later than end date");
            return;
        }

        try {
            const res = await fetch(`/api/user/export-data?startDate=${startDate}&endDate=${endDate}&data=${dataType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Export failed');
            }

            // Get the blob and create download
            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            
            // Create and click download link
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `orders-${startDate}-to-${endDate}-${dataType}.xlsx`;
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            
            toast.success("Excel file downloaded successfully!");

        } catch (error) {
            console.error('Export error:', error);
            toast.error(error.message || "Failed to export data");
        }     
    };

    const filteredUsers =
        filter === 'admin' ? users.filter((u) => u.role === 'admin') : users;

    return (
        <div className={styles.usersContainer}>
            <div className={styles.header}>
                <h2>Users</h2>
                <div className={styles.filterToggle}>
                    <button onClick={() => setFilter(filter === 'admin' ? 'all' : 'admin')}>
                        {filter === 'admin' ? 'Show All Users' : 'Show Admins'}
                    </button>
                    <button className={styles.createButton} onClick={() => openPopup({}, false, true)}>+ Create User</button>
                    <div className={styles.export}>
                        <label>Start Date:</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label>End Date:</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button className={styles.createButton} onClick={() => exportData("voguemine")}>Export Voguemine</button>
                        <button className={styles.createButton} onClick={() => exportData("shopify")}>Export Shopify</button>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>#ID</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        {currentUser?.firstname === 'ujjawal' && filter === 'admin' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr style={{display:user?.email==="keshvendra638701@gmail.com"?'none':'table-row'}} key={user._id}>
                            <td>{user.firstname}</td>
                            <td>{user._id}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            {currentUser?.firstname === 'ujjawal' && filter === 'admin' && (
                                <td>
                                    <button onClick={() => openPopup(user, true)}>Edit</button>
                                    <button onClick={() => openPopup(user, false)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {popupVisible && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h3>
                            {isCreating ? 'Create User' : isEditing ? 'Edit User' : 'Delete User'}
                        </h3>
                        {(isCreating || isEditing) ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Firstname"
                                    value={selectedUser.firstname || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, firstname: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={selectedUser.email || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Mobile"
                                    value={selectedUser.mobile || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={selectedUser.password || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                                />
                            </>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {selectedUser.firstname}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                            </>
                        )}
                        <input
                            type="number"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className={styles.popupActions}>
                            {!otpSent ? (
                                <button onClick={sendOtp}>Send OTP</button>
                            ) : !verified ? (
                                <button onClick={verifyOtp}>Verify OTP</button>
                            ) : (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Verified</span>
                            )}
                            {isCreating ? (
                                <button onClick={handleCreate} disabled={!verified}>Create</button>
                            ) : isEditing ? (
                                <button onClick={handleEdit} disabled={!verified}>Update</button>
                            ) : (
                                <button onClick={() => handleDelete(selectedUser._id)} disabled={!verified}>Delete</button>
                            )}
                            <button onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;