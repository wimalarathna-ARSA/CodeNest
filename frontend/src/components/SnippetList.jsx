import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddSnippet from './AddSnippet';
import { Clock , Trash2, Edit2, Star, User, Search, Copy, LogOut   } from 'lucide-react';
import { Button } from '@mui/material';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const location = useLocation();

  const fetchSnippets = async () => {
    const res = await axios.get('http://localhost:5000/api/snippets');
    setSnippets(res.data);
  };

  const handleStarClick = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/snippets/${id}/star`);
      const updatedStars = res.data.stars;

      // Update the star count locally for the snippet with matching id
      setSnippets(prevSnippets =>
        prevSnippets.map(snippet =>
          snippet._id === id ? { ...snippet, stars: updatedStars } : snippet
        )
      );
    } catch (error) {
      alert('Failed to update star count');
    }
  };


  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/snippets/search?query=${query}`);
    setSnippets(res.data);
  };

const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this snippet?');
  if (!confirmed) return;

  try {
    await axios.delete(`http://localhost:5000/api/snippets/${id}`);
    alert('Snippet deleted successfully');
    fetchSnippets();
  } catch (error) {
    alert('Failed to delete snippet');
  }
};

  const getLanguageIcon = (language) => {
    const icons = {
    javascript: '⚡',  
    python: '🐍',      
    java: '☕',        
    cpp: '🔷',         
    rust: '🦀',        
    go: '🐹',          
    typescript: '📘',  
    html: '🌐',        
    css: '🎨',        
    sql: '🗄️'       
    };

    return icons[language] || '📄';
  };

  const getLanguageColor = (language) => {
    const colors = {
      cpp: '#60a5fa',
      rust: '#fb923c',
      java: '#facc15',
      python: '#4ade80',
      javascript: '#fde047'
    };
    return colors[language] || '#9ca3af';
  };

 


  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = !query || 
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      snippet.language.toLowerCase().includes(query.toLowerCase()) ||
      (snippet.author && snippet.author.toLowerCase().includes(query.toLowerCase()));
    
    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  

  // Initial load
  useEffect(() => {
    fetchSnippets();
  }, []);

  // Re-fetch if AddSnippet just added one
  useEffect(() => {
    if (location.state?.added) {
      fetchSnippets();
    }
  }, [location.state]);


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation Header */}
      <nav style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.3)', backgroundColor: 'rgba(15, 23, 42, 0.5)',  backdropFilter: 'blur(12px)'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2rem', color: '#60a5fa' }}>⚡</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CodeNest</span>
              <div>
                <Button
                  href="/"
                  variant="contained"
                  color="error"
                  onClick={() => {}}
                  style={{padding: "12px 24px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", display: "flex",alignItems: "center", gap: "8px", textTransform: "none" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
                >
                  <LogOut size={16} />
                  LogOut
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Discover & Share Code Snippets
          </h1>
          <p style={{fontSize: '1.25rem',color: '#cbd5e1', marginBottom: '2rem'}}>
            Explore a curated collection of code snippets from the community
          </p>

          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: '32rem', margin: '0 auto' }}>
           <div style={{ position: 'relative' }}>
            <span
                style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem', color: '#94a3b8', zIndex: 10, pointerEvents: 'none', }}
                >
                <Search size={16} />
            </span>
              <input
                type="text"
                placeholder="Search snippets by title, language, or author..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{width: '100%', paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.75rem', color: '#fff', fontSize: '1rem', backdropFilter: 'blur(12px)', outline: 'none', transition: 'all 0.2s' }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(96, 165, 250, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>
        {/* Add Snippet Component */}
        <div style={{ marginBottom: '2rem' }}>
          <AddSnippet onAdd={fetchSnippets} />
        </div>
        {/* Language Filter */}
        <div style={{ display: 'flex',flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',gap: '1rem', padding: '1.5rem', backgroundColor: 'rgba(30, 41, 59, 0.3)', borderRadius: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', backdropFilter: 'blur(12px)', marginBottom: '2rem'}}>
          <span style={{ color: '#94a3b8', fontWeight: '500' }}>Languages:</span>
          <button
            onClick={() => setSelectedLanguage('')}
            style={{ padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid', backgroundColor: selectedLanguage === '' ? '#2563eb' : 'rgba(51, 65, 85, 0.5)', color: selectedLanguage === '' ? '#fff' : '#cbd5e1', borderColor: selectedLanguage === '' ? '#2563eb' : 'rgba(100, 116, 139, 0.5)', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem', fontWeight: '500'}}
            onMouseEnter={(e) => {
              if (selectedLanguage !== '') {
                e.target.style.backgroundColor = 'rgba(51, 65, 85, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedLanguage !== '') {
                e.target.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
              }
            }}
          >
            All
          </button>
          
          {['cpp', 'rust', 'java', 'python', 'javascript'].map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(selectedLanguage === language ? '' : language)}
              style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid',
                backgroundColor: selectedLanguage === language 
                  ? `${getLanguageColor(language)}20` 
                  : 'rgba(51, 65, 85, 0.5)',
                color: getLanguageColor(language), borderColor: `${getLanguageColor(language)}30`, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem', fontWeight: '500' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${getLanguageColor(language)}30`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = selectedLanguage === language 
                  ? `${getLanguageColor(language)}20` 
                  : 'rgba(51, 65, 85, 0.5)';
              }}
            >
              <span>{getLanguageIcon(language)}</span>
              <span>{language.toUpperCase()}</span>
            </button>
          ))}
          
          <div style={{ color: '#94a3b8', marginLeft: '1rem', fontSize: '0.875rem' }}>
            {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Snippets Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
          {filteredSnippets.map((snippet) => (
            <div key={snippet._id} style={{ position: 'relative', backgroundColor: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.75rem', padding: '1.5rem', transition: 'all 0.3s', cursor: 'pointer'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(96, 165, 250, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              {/* Header */}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: `1px solid ${getLanguageColor(snippet.language)}30`, color: getLanguageColor(snippet.language), fontSize: '0.875rem', fontWeight: '500' }}>
                  <span>{getLanguageIcon(snippet.language)}</span>
                  <span>{snippet.language.toUpperCase()}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                  <Clock size={18} color="#facc15" style={{ marginRight: '0.5rem' }} />
                   {new Date(snippet.date).toLocaleDateString()}
                </div>
              </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <Star
                size={18}
                color="#facc15"
                fill={snippet.stars > 0 ? "#facc15" : "none"}
                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                onClick={() => handleStarClick(snippet._id)}
                title="Click to star"
                />

              <span style={{ color: '#facc15', marginRight: '0.75rem', fontWeight: '600' }}>
                {snippet.stars}
              </span>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#fff', margin: 0, transition: 'color 0.2s'}}>
                {snippet.title}
              </h3>
            </div>

              {/* Code Preview */}
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
                <pre style={{fontSize: '0.875rem', color: '#cbd5e1', fontFamily: 'ui-monospace, monospace', overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>
                  <code
                    onClick={() => setSelectedSnippet(snippet)}
                    style={{ cursor: 'pointer', display: 'block' }}
                    >
                    {snippet.code.substring(0, 120)}... <span style={{ color: '#60a5fa' }}>(click to view more)</span>
                    </code>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                </div>
                </pre>
              </div>
              {/* Author */}
              <div style={{display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
                 <User size={14} style={{ marginRight: '0.25rem' }} />
                by {snippet.author || 'Unknown'}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(148, 163, 184, 0.3)'}}>
                <Link
                  to={`/edit/${snippet._id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s'}}
                  onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
                  onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
                >
                   <Edit2 size={14} style={{ marginRight: '0.25rem' }} />
                  <span>Edit</span>
                </Link>
                
                <button
                  onClick={() => handleDelete(snippet._id)}
                  style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none',  borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  }}
                >
                  <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <span style={{ fontSize: '4rem', color: '#475569', marginBottom: '1rem', display: 'block' }}>⚡</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.5rem' }}>
              No snippets found
            </h3>
            <p style={{ color: '#64748b' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      {selectedSnippet && (
            <div
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 999, display: 'flex', justifyContent: 'center',alignItems: 'center' }}
                onClick={() => setSelectedSnippet(null)}
            >
                <div
                style={{background: '#1e293b',color: '#fff',padding: '2rem',borderRadius: '0.75rem',maxWidth: '90%',maxHeight: '80%',overflow: 'auto',position: 'relative'}}
                onClick={(e) => e.stopPropagation()}
                >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {selectedSnippet.title}
                </h2>

                <pre
                    style={{fontSize: '0.9rem', fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                >
                    <code>{selectedSnippet.code}</code>
                </pre>

                {/* Copy Button */}
                <button
                    onClick={() => {
                    if (!selectedSnippet?.code) {
                        alert('No code available to copy.');
                        return;
                    }
                    navigator.clipboard
                        .writeText(selectedSnippet.code)
                        .then(() => alert('Code copied to clipboard!'))
                        .catch(() => alert('Failed to copy code.'));
                    }}
                    style={{ position: 'absolute', top: '1rem', right: '5.5rem', display: 'flex', alignItems: 'center',gap: '0.25rem',backgroundColor: 'rgba(255, 255, 255, 0.1)',border: '1px solid rgba(255, 255, 255, 0.2)',borderRadius: '0.375rem', padding: '0.25rem 0.5rem', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                > <Copy size={14} />
                    Copy
                </button>

                {/* Close Button */}
                <button
                    onClick={() => setSelectedSnippet(null)}
                    style={{position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.9em', fontWeight: '600', border: '1px solid #444', backgroundColor: 'transparent', color: '#ccc', transition: 'all 0.3s ease' }}
                >
                    Close
                </button>
                </div>
            </div>
            )}
    </div>
  );
};

export default SnippetList;
