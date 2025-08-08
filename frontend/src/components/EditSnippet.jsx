import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Code2, FileText, Star } from 'lucide-react';

const EditSnippet = () => {
  const [form, setForm] = useState({ title: '', code: '', language: '', author: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snippets/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/snippets/${id}`, form);
    alert('Snippet updated successfully!'); 
    navigate('/snippetlist');
  };

  const handleCancel = () => {
    navigate('/snippetlist');
  };

  const languages = ['javascript', 'python', 'java', 'cpp', 'rust', 'go', 'typescript', 'html', 'css', 'sql'];

  const user = {
    name: form.author || 'Unknown Author',
    title: 'Code Snippet Manager',
    membership: 'Pro Member',
  };

  const stats = [
    {
      title: 'Total code runs',
      value: Math.floor(Math.random() * 100) + 1,
      time: `Last 24h: ${Math.floor(Math.random() * 30) + 1}`,
      icon: FileText,
    },
    {
       title: 'Saved for later',
       value: form.stars || 0, 
       detail: 'Starred Snippets',
       icon: Star,
    },
    {
      title: 'Most used',
      value: form.language || 'Unknown language',
      detail: 'Primary Language',
      language: form.language,
      icon: Code2,
    },
  ];

  const getLanguageColor = (language) => {
    const colors = {
        javascript: '#fde047',   
        python: '#4ade80',       
        java: '#facc15',         
        cpp: '#60a5fa',         
        rust: '#fb923c',         
        go: '#00ADD8',          
        typescript: '#3178c6',   
        html: '#f97316',        
        css: '#38bdf8',       
        sql: '#64748b',  
    };
    return colors[language] || '#9ca3af';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a, #581c87)', color: '#fff', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #60a5fa, #a855f7)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
             {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#cbd5e1' }}>{user.title}</p>
          </div>
          <span style={{ backgroundColor: '#a855f7', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem' }}>{user.membership}</span>
        </div>
        <button
          onClick={() => navigate('/snippetlist')}
          style={{ background: 'linear-gradient(90deg, #60a5fa, #a855f7)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', }}
        >
          + New Snippet
        </button>
      </div>

      {/* Form */}
      <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', padding: '2rem', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Edit Snippet
        </h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required style={inputStyle} />

          <label>Language:</label>
          <select name="language" value={form.language} onChange={handleChange} required style={inputStyle}>
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>

          <label>Author:</label>
          <input type="text" name="author" value={form.author} onChange={handleChange} style={inputStyle} readOnly/>

          <label>Code:</label>
          <textarea name="code" rows="10" value={form.code} onChange={handleChange} required style={{ ...inputStyle, fontFamily: 'monospace' }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', fontSize: '0.9em', fontWeight: '600', border: '1px solid #444', borderRadius: '6px', backgroundColor: 'transparent', color: '#ccc', cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            onMouseEnter={(e) => {
               e.target.style.backgroundColor = '#2a2a3e';
               e.target.style.borderColor = '#555';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#444';
            }}>
              Cancel
            </button>
            <button type="submit"  style={{padding: '10px 20px', fontSize: '0.9em', fontWeight: '600', border: 'none', borderRadius: '6px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => {
             e.target.style.transform = 'translateY(-1px)';
             e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <FileText size={16} /> Update Snippet
            </button>
          </div>
        </form>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: getLanguageColor(stat.language || form.language) }}>
                <Icon />
              </div>
              <h3 style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>{stat.title}</h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff'  }}>{stat.value}</p>
              {stat.time && <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{stat.time}</p>}
              {stat.detail && <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{stat.detail}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#1e293b',
  border: '1px solid #475569',
  borderRadius: '0.5rem',
  color: '#fff',
  marginBottom: '1.5rem',
};



export default EditSnippet;
