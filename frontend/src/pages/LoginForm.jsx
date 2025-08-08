// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Lock, UserPlus, KeyRound } from 'lucide-react';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(formData);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/snippetlist');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
       minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",   // make parent relative for absolute children
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
         {/* Background pattern div */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "float 20s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

         <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <Lock size={36} color="#fff" />
            </div>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#666', fontSize: '16px' }}
            >
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.2)',
                '& .MuiAlert-message': { color: '#d32f2f' }
              }}
            >
              {error}
            </Alert>
          )}

          <FormControl component="form" onSubmit={handleSubmit} fullWidth>
            <TextField
              name="email"
              placeholder="Email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea'
                    }
                  },
                  '&.Mui-focused': {
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                      borderWidth: '2px'
                    }
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea'
                }
              }}
            />

            <TextField
              name="password"
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: '#667eea',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.1)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea'
                    }
                  },
                  '&.Mui-focused': {
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                      borderWidth: '2px'
                    }
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea'
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                  transform: 'translateY(-2px)'
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, #ccc, #999)',
                  boxShadow: 'none'
                }
              }}
            >
              {isLoading ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Signing In...
                </div>
              ) : (
                'Login'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <Box sx={{ height: '1px', flex: 1, backgroundColor: '#ddd' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#999',
                    fontWeight: 600,
                    px: 2,
                    backgroundColor: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Need Help?
                </Typography>
                <Box sx={{ height: '1px', flex: 1, backgroundColor: '#ddd' }} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link
                  to="/register"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    color: '#667eea',
                    fontWeight: 600,
                    fontSize: '14px',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                  onMouseLeave={(e) => e.target.style.color = '#667eea'}
                >
                  <UserPlus size={16} /> Don’t have an account? Create one
                </Link>

                <Link
                  to="/forgot-password"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    color: '#888',
                    fontWeight: 500,
                    fontSize: '14px',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#667eea'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}
                >
                  <KeyRound size={16} /> Forgot your password?
                </Link>
              </Box>
            </Box>
          </FormControl>
        </Paper>
      </Container>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { background-position: 0 0, 0 0; }
          50% { background-position: 30px 30px, 30px 30px; }
        }
      `}</style>
    </div>
  );
}
