import React, { useState, useEffect } from "react";
import App from "./App";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const validUsername =  import.meta.env.VITE_USERNAME;
  const validPassword = import.meta.env.VITE_PASSWORD;
  useEffect(() => {
    // Check if username and password are saved in sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    const storedPassword = sessionStorage.getItem("password");

    // Replace with your specific credentials
    if (storedUsername === validUsername && storedPassword === validPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {    
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      setError("");
    } else {
      setError("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  };

  if (!isAuthenticated) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <Card sx={{ maxWidth: 400, width: "100%", padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center" mb={2}>
              Login
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{ fontWeight: "bold", color: "primary.white", mt: 2 }}
            >
              Login
            </Button>
            {error && (
              <Typography color="error" textAlign="center" mt={2}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }

  return <App />;
};

export default LandingPage;
