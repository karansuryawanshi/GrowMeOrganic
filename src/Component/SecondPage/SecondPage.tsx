import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import DepartmentList from '../DepartmentList/DepartmentList';
import { Post } from '../../Container/types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    } else {
      fetchData();
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <>
    <div style={{ height: 600, width: '100%', marginTop: '2em' }}>
      <h1>Posts</h1>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems:"center", justifyContent:"center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ height: 600, width: '100%', marginBottom: '2em' }}>
          <DataGrid
            rows={posts}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            />
        </div>
      )}
      <DepartmentList />
    </div>
    </>
  );
};

export default SecondPage;
