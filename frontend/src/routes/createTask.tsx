import React, {useState} from 'react';
import backButtonImage from "../assets/back.svg";
import {useNavigate} from "react-router-dom";
import "./createTask.css";
import {toast} from "react-toastify";

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSaving(true)

    const newTask = {
      title,
      description,
    };

    // TODO send new task to server
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        setIsSaving(false)
        if (!response.ok) {
          throw new Error('Failed to create goal');
        }

        // After saving, navigate back to the task list
        toast("Goal created successfully! 🎉", {type: "success"});
        navigate('/');
      }).catch((error) => {
      console.error('Error:', error);
    })
  };

  return (
    <div className="createGoal">
      <button onClick={goBack} className="createTask__back_button">
        <img src={backButtonImage} alt="Back" className="createTask__back_button__image"/>
      </button>
      <div className='createTask__main_content'>
        <h1 className="createTask__title">Create Goal</h1>

        <form onSubmit={handleSubmit}>
          <div className="createTask__form_section">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Go to the gym"
              required
            />
          </div>
          <div className="createTask__form_section">
            <label htmlFor="description">Description of what a successful image will be of:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A photo of me in the gym, for example lifing weights or running on the treadmill"
              required
            />
          </div>
          <button type="submit" className="createTask__submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Create goal 🔥'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
// teehhee