import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './FirstPage.css';

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isNumeric = /^[0-9]*$/.test(value);
    if (isNumeric) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/posts');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="form-container">
      <h1>Enter your details</h1>
      <form onSubmit={handleSubmit}>
        <div className="label">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="label">
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={handlePhoneChange}
            error={phoneError}
            helperText={phoneError ? "Phone number should only contain numbers" : ""}
          />
        </div>
        <div className="label">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="button">
          <Button variant="contained" color="primary" type="submit" className="submit-Button">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FirstPage;
