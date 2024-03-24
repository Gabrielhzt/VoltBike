import React, { useEffect, useState } from "react";
import axios from "axios";
import './info.css';

const Info = () => {
    const [profile, setProfile] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:46381/user/profile', {
                headers: {
                  Authorization: token
                }
              });
            setProfile(response.data);
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.log('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:46381/user/profile', {
                username: username,
                email: email
            }, {
                headers: {
                  Authorization: token
                }
              });
            setMessage('User information updated successfully');
            setUpdate(false);
        } catch (error) {
            setMessage('Error updating user information');
            console.log('Error updating user:', error);
        }
    };

    return (
        <div className="info">
            <p className="description-info">On this page, you can view your current username and email address. To modify this information, press the "Edit Profile" button. Then, fill in the fields with the new information and press "Edit Profile" again to save the changes.</p>
            {update ? (
                <form onSubmit={handleSubmit}>
                    <div className="title-name"> 
                        <label className="title-name">Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="title-name">
                        <label className="title-name">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            ) : (
                <div>
                    <p className="title-name">Username: {profile.username}</p>
                    <p className="title-name">Email: {profile.email}</p>
                    <button onClick={() => setUpdate(true)}>Edit Profile</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default Info;
