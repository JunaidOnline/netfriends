import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import PostList from './components/PostList';
import UpdatePost from './components/UpdatePost';

const App = () => {
  return (
    <div className="App">
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route exact path="/" element={<PostList />} />
          <Route path="/edit/:postId" element= {<UpdatePost/>} />
          <Route path="/edit/:postId">
            {({ match }) => {
              const { postId } = match.params;
              return <UpdatePost postId={postId} />;
            }}
          </Route>
        </Routes>
      </Container>
    </Router>
    </div>
  );
};

export default App;

