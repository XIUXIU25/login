// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import '../styles/ProfilePage.css';

function ProfilePage({ profile, setProfile }) {
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [actualNameError, setActualNameError] = useState('');


  const handleEditClick = (field) => {
    setEditField(field);
    setTempValue(profile[field]);
  };

  const handleSaveClick = (field) => {
    if (field === 'username') {
      if (!tempValue.trim()) {
        setUsernameError('Username cannot be empty or contain only spaces.');
        return;
      } 
        else {
        setUsernameError(''); 
      }
    }
  
    if (field === 'actualName') {
      if (!tempValue.trim()) {
        if (tempValue === '') {
          setActualNameError('');
          setProfile((prevProfile) => ({
            ...prevProfile,
            actualName: prevProfile.username,
          }));
        } else {
          setActualNameError('Actual Name cannot contain only spaces, but can be empty');
          return;
        }
        setEditField(null); 
        return;        
      }
      
      setProfile((prevProfile) => ({
        ...prevProfile,
        actualName: tempValue,
      }));     
      setActualNameError(''); 
    } else {     
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: tempValue,
      }));
    }
    setEditField(null); 
  };

  const handleSaveImgClick = (imgPath) => {
    setProfile((prevProfile) => {
      const updatedProfile = {
        ...prevProfile,
        profilePic: imgPath,
      };
      console.log('Updated Profile:', updatedProfile); 
      return updatedProfile;
    });
    setEditField(null);
  };

  const handleCancelClick = () => {
    setEditField(null);
    setUsernameError('');
    setActualNameError('');
  };
 
  return (
    <div className="profile-page">
      <main className="main-content">
        <h1>Profile</h1>

        <div className="profile-item">
          <span className='profile-pic'>Profile Picture:</span>
          {editField === 'profilePic' ? (
            <div className="image-selector">
              <img
                src="./img/pic1.jpg"
                alt="Picture 1"
                className="profile-img"
                onClick={() => handleSaveImgClick('./img/pic1.jpg')}
              />
              <img
                src="./img/pic2.jpg"
                alt="Picture 2"
                className="profile-img"
                onClick={() => handleSaveImgClick('./img/pic2.jpg')}
              />
              <img
                src="./img/pic3.jpg"
                alt="Picture 3"
                className="profile-img"
                onClick={() => handleSaveImgClick('./img/pic3.jpg')}
              />
            </div>
          ) : (
            <span>
            <img src={profile.profilePic} alt="Profile Pic" className="profile-pic-preview" />
            </span>
          )}

          {editField === 'profilePic' ? null : (
            <button onClick={() => handleEditClick('profilePic')}>Edit</button>
          )}
        </div>

        <div className="profile-item">
          <label htmlFor="username">Username:</label>
          {editField === 'username' ? (
            <input
              id="username"
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
          ) : (
            <span>{profile.username}</span>
          )}
          {editField === 'username' ? (
            <>
              <div className='button-group'>
                <button onClick={() => handleSaveClick('username')}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          ) : (
            <button onClick={() => handleEditClick('username')}>Edit</button>
          )}
        </div>
        <div>
          {usernameError && 
            (<div className="error-message">
              {usernameError}
              </div>
            )}
        </div>
        
        <div className="profile-item">
          <label htmlFor="actualName">Actual Name:</label>
          {editField === 'actualName' ? (
            <input
              id="actualName"
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
          ) : (
            <span>{profile.actualName}</span>
          )}
          {editField === 'actualName' ? (
            <>
              <div className='button-group'>
                <button onClick={() => handleSaveClick('actualName')}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          ) : (
            <button onClick={() => handleEditClick('actualName')}>Edit</button>
          )}
        </div>
        <div>
          {actualNameError && 
            (<div className="error-message">
              {actualNameError}
              </div>
            )}
        </div>
        
        <div className="profile-item">
          <label htmlFor="isCarFree">Is Car Free:</label>
          {editField === 'isCarFree' ? (
            <input
              id="isCarFree"
              type="checkbox"
              checked={tempValue}
              onChange={(e) => setTempValue(e.target.checked)}
            />
          ) : (
            <span>{profile.isCarFree ? 'Yes' : 'No'}</span>
          )}
          {editField === 'isCarFree' ? (
            <>
              <div className='button-group'>
                <button onClick={() => handleSaveClick('isCarFree')}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          ) : (
            <button onClick={() => handleEditClick('isCarFree')}>Edit</button>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;