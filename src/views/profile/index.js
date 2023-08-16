import React, { useState, useEffect } from 'react';
import { logInUser } from 'src/services/loginDetail'; 

const Profile = ({ userType, userId }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await logInUser();
        setUserProfile(response.data); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, [userType, userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Contact No: {userProfile.contact}</p>
      <p>Type: {userProfile.type}</p>
      <p>Address: {userProfile.address}</p>
    </div>
  );
};

export default Profile;
