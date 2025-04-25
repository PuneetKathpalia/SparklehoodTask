import { useState, useMemo } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, Paper, AppBar, Toolbar, IconButton, useMediaQuery, Link, Avatar, Tooltip, Divider } from '@mui/material';
import { IncidentList } from './components/IncidentList';
import { ReportIncidentForm } from './components/ReportIncidentForm';
import { mockIncidents } from './data/mockData';
import { AISafetyIncident, Severity, SortOrder } from './types';
import MenuIcon from '@mui/icons-material/Menu';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [incidents, setIncidents] = useState<AISafetyIncident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            default: mode === 'light' ? '#f5f7fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          error: {
            main: '#f44336',
          },
          warning: {
            main: '#ff9800',
          },
          success: {
            main: '#4caf50',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 4px 12px rgba(0,0,0,0.05)' 
                  : '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'light'
                    ? '0 8px 24px rgba(0,0,0,0.1)'
                    : '0 8px 24px rgba(0,0,0,0.3)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
              contained: {
                boxShadow: mode === 'light'
                  ? '0 4px 6px rgba(0,0,0,0.1)'
                  : '0 4px 6px rgba(0,0,0,0.3)',
                '&:hover': {
                  boxShadow: mode === 'light'
                    ? '0 6px 10px rgba(0,0,0,0.15)'
                    : '0 6px 10px rgba(0,0,0,0.4)',
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const filteredAndSortedIncidents = useMemo(() => {
    let filtered = incidents;
    
    if (severityFilter !== 'All') {
      filtered = filtered.filter((incident) => incident.severity === severityFilter);
    }

    return [...filtered].sort((a, b) => {
      const dateA = a.reportedDate.getTime();
      const dateB = b.reportedDate.getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [incidents, severityFilter, sortOrder]);

  const handleNewIncident = (newIncident: Omit<AISafetyIncident, 'id' | 'reportedDate'>) => {
    const incident: AISafetyIncident = {
      ...newIncident,
      id: Date.now().toString(),
      reportedDate: new Date(),
    };
    setIncidents((prev) => [incident, ...prev]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
        <AppBar position="static" elevation={0} sx={{ 
          backgroundColor: 'background.paper', 
          color: 'text.primary',
          width: '100%'
        }}>
          <Toolbar sx={{ width: '100%' }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                mr: 2, 
                color: 'text.primary',
                fontWeight: 800,
                fontSize: '1.8rem',
                fontFamily: '"Poppins", "Roboto", sans-serif',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              PK
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              AI Safety Dashboard
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {isMobile && (
              <IconButton edge="end" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        
        <Container 
          maxWidth={false} 
          sx={{ 
            flexGrow: 1, 
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: '100% !important',
            width: '100%',
            margin: 0,
            '& > *': {
              maxWidth: '100%'
            }
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              mb: 4, 
              background: 'linear-gradient(135deg, #3f51b5 0%, #002984 100%)',
              color: 'white',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '30%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                transform: 'skewX(-15deg)',
              }
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              AI Safety Incident Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '70%' }}>
              Monitor, report, and manage AI safety incidents in one place. Track severity levels, filter by importance, and maintain a comprehensive record of AI safety concerns.
            </Typography>
          </Paper>
          
          <ReportIncidentForm onSubmit={handleNewIncident} />
          <IncidentList
            incidents={filteredAndSortedIncidents}
            onFilterChange={setSeverityFilter}
            onSortChange={setSortOrder}
          />
        </Container>
        
        <Box 
          component="footer" 
          sx={{ 
            py: 4, 
            px: 2, 
            mt: 'auto', 
            backgroundColor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 4 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                  AI Safety Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 400 }}>
                  A modern web application for managing and reporting AI safety incidents. Built with React, TypeScript, and Material-UI.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} AI Safety Dashboard. All rights reserved.
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Created by
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    alt="Puneet Kathpalia" 
                    src="/avatar-placeholder.jpg" 
                    sx={{ width: 56, height: 56, mr: 2, border: '2px solid', borderColor: 'primary.main' }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Puneet Kathpalia
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Full Stack Developer
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="GitHub Profile">
                    <IconButton 
                      component={Link} 
                      href="https://github.com/puneetkathpalia" 
                      target="_blank" 
                      rel="noopener"
                      sx={{ 
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn Profile">
                    <IconButton 
                      component={Link} 
                      href="https://www.linkedin.com/in/puneetkathpalia/" 
                      target="_blank" 
                      rel="noopener"
                      sx={{ 
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Portfolio">
                    <IconButton 
                      component={Link} 
                      href="https://pk-portfolio-seven.vercel.app/" 
                      target="_blank" 
                      rel="noopener"
                      sx={{ 
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      <CodeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton 
                      component={Link} 
                      href="mailto:puneetkathpalia@gmail.com" 
                      sx={{ 
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              This project was created as part of a frontend intern take-home assignment for HumanChain.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
