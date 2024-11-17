import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Tasks from "./routes/tasks.tsx";
import Camera from "./routes/camera.tsx";
import CreateTask from "./routes/createTask.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireSignedIn from "./components/requireSignedIn.tsx";
import EditTask from './routes/editTask';


function App() {
  return (
    <>
      <RequireSignedIn>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Tasks/>}/>
            <Route path="camera/:taskId" element={<Camera/>}/>
            <Route path="/create-task" element={<CreateTask/>}/>
            <Route path="/edit-task/:taskId" element={<EditTask />} />
          </Routes>
        </BrowserRouter>
      </RequireSignedIn>

      <ToastContainer/>
    </>
  )
}

export default App
