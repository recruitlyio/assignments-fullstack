import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GenerateForm({ setQuestions }) {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('Junior');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isValid = role.trim() !== '' && skills.trim() !== '';
    setIsFormValid(isValid);
  }, [role, skills]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!role.trim()) newErrors.role = 'Role is required';
    if (!skills.trim()) newErrors.skills = 'Skills are required';
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      const response = await fetch('http://localhost:4000/api/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, skills, experience }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(` Error: ${errorData?.error || 'Something went wrong!'}`);
        return;
      }
  
      const data = await response.json();
      console.log(data,"res se");

      setQuestions(data);
      toast.success('Questions generated successfully!');
      navigate('/questions');
  
    } catch (error) {
      toast.error('Network Error: Unable to contact server.');
    }
  };
  

  return (
      <div className="app-container">
   <ToastContainer
  position="bottom-center"  
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

      <h1>Technical Interview Question Generator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className={errors.role ? 'error' : ''}
          type="text"
          placeholder="Role Title (e.g., Frontend/Backend Developer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        {errors.role && <small className="error-text">{errors.role}</small>}

        <input
          className={errors.skills ? 'error' : ''}
          type="text"
          placeholder="Skills (e.g., React, node,python)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        {errors.skills && <small className="error-text">{errors.skills}</small>}

        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>

        <button type="submit" disabled={!isFormValid}>Generate Questions</button>
      </form>
    </div>
  );
}

export default GenerateForm;
