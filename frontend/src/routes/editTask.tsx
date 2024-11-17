import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams(); // Assuming taskId is passed via URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch task details to populate the form
  useEffect(() => {
    fetch(`/api/tasks/${taskId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch task details.');
        }
        return response.json();
      })
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
        toast.error('Could not load task details.');
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting update for Task ID:', taskId); // Debug log
  
    const updatedTask = {
      _id: taskId,
      title,
      description,
    };
  
    fetch('/api/tasks/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Failed to update task.');
          });
        }
        return response.json();
      })
      .then(() => {
        toast.success('Task updated successfully.');
        navigate('/'); // Redirect to the tasks list
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(error.message || 'Failed to update task.');
      });
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Task'}
      </button>
    </form>
  );
};

export default EditTask;
