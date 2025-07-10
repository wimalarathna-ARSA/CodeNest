import React, { useState } from 'react';
import { FileText, User, Code, Code2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSnippet = () => {
  const [form, setForm] = useState({ title: '', code: '', language: '', author: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    await axios.post('http://localhost:5000/api/snippets', form);
    alert('Snippet added successfully!');
    setForm({ title: '', code: '', language: '', author: '' });
    navigate('/', { state: { added: true } });
  } catch (error) {
    console.error('Error adding snippet:', error);
    alert('Failed to add snippet. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  const languageOptions = ['javascript', 'python', 'java', 'cpp', 'rust', 'go', 'typescript', 'html', 'css', 'sql'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
      <div style={{maxWidth: '70%', width: '100%', backgroundColor: 'rgba(30, 30, 45, 0.95)', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{fontSize: '1.8em', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px', fontWeight: 'bold' }}>
            Add Code Snippet
          </h2>
          <p style={{ color: '#888', fontSize: '0.9em' }}>
            Share your code with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.9em', fontWeight: '600', color: '#ccc', marginBottom: '6px'}}>
              <FileText style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} /> Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter snippet title"
              required
              style={{ padding: '10px 12px', fontSize: '0.9em', border: '1px solid #333', borderRadius: '6px',backgroundColor: '#1e1e2e',color: '#fff',transition: 'border-color 0.3s ease',outline: 'none'}}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{fontSize: '0.9em', fontWeight: '600', color: '#ccc', marginBottom: '6px' }}>
                <Code style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} /> Language
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                required
                style={{padding: '10px 12px', fontSize: '0.9em', border: '1px solid #333',borderRadius: '6px', backgroundColor: '#1e1e2e', color: '#fff', transition: 'border-color 0.3s ease', outline: 'none', cursor: 'pointer' }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              >
                <option value="">Select language</option>
                {languageOptions.map(lang => (
                  <option key={lang} value={lang} style={{ backgroundColor: '#1e1e2e' }}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.9em', fontWeight: '600', color: '#ccc', marginBottom: '6px' }}>
                <User style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} /> Author
              </label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Your name"
                style={{ padding: '10px 12px', fontSize: '0.9em', border: '1px solid #333', borderRadius: '6px', backgroundColor: '#1e1e2e', color: '#fff', transition: 'border-color 0.3s ease', outline: 'none'}}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{fontSize: '0.9em', fontWeight: '600', color: '#ccc', marginBottom: '6px' }}>
              <Code2 style={{ width: '16px', height: '16px', marginRight: '6px', verticalAlign: 'middle' }} /> Code
            </label>
            <textarea
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Paste your code here..."
              rows="8"
              required
              style={{ padding: '12px', fontSize: '13px', fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace', border: '1px solid #333', borderRadius: '6px', backgroundColor: '#1e1e2e', color: '#fff', transition: 'border-color 0.3s ease', outline: 'none', resize: 'vertical', lineHeight: '1.4' }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{ padding: '10px 20px', fontSize: '0.9em', fontWeight: '600', border: '1px solid #444', borderRadius: '6px', backgroundColor: 'transparent', color: '#ccc', cursor: 'pointer',transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2a2a3e';
                e.target.style.borderColor = '#555';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#444';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ padding: '10px 20px', fontSize: '0.9em', fontWeight: '600', border: 'none', borderRadius: '6px', background: isSubmitting ? '#555' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isSubmitting ? 'Adding...' : 'Add Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSnippet;