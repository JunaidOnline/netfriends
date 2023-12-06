import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);

  // Logic to get current posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle post deletion
  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Logic to display current posts with their IDs
  const renderPosts = currentPosts.map((post) => (
    <Grid item key={post.id}>
      <Typography variant="subtitle1">ID: {post.id}</Typography>
      <Typography variant="h6">Title: {post.title}</Typography>
      <Typography>{post.body}</Typography>
      <Button variant="contained" color="error" onClick={() => handleDelete(post.id)}>
        Delete
      </Button>
   <Link to="/edit/:postId">  <Button variant="contained" color="primary" display="flex" justify-content="space-between" onClick={() => handleDelete(post.id)}>
        Update
      </Button>
      </Link> 
    </Grid>
  ));

  // Logic for pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <Button id='pageination-btn'
      key={number}
      onClick={() => setCurrentPage(number)}
      variant={currentPage === number ? 'contained' : 'outlined'}
      color="primary"
    >
      {number}
    </Button>
  ));

  return (
    <div className='pagination'>
    <Grid container direction="column" spacing={-2}>
      <Typography variant="h4">List of Posts</Typography>
      {renderPosts}
      <Grid item style={{margin:"5px"}}>
        {renderPageNumbers}
      </Grid>
    </Grid>
    </div>
  );
};

export default PostList;
