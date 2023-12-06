import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const UpdatePost = ({ postId, initialBody }) => {
  const [updatedBody, setUpdatedBody] = useState("");  
  const navigate = useNavigate();
  
  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: updatedBody }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      navigate("/");
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Update Post
      </Typography>
      <input type='text'  style={{  width: '300px', height: '40px', margin: '10px' }}
        aria-label={`update-body-${postId}`}
        placeholder="Update body..."
        value={updatedBody}
        onChange={(e) => setUpdatedBody(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default UpdatePost;

