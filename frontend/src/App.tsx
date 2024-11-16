import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./routes/home.tsx";
import Tasks from "./routes/tasks.tsx";
import Camera from "./routes/camera.tsx";
import CreateTask from "./routes/createTask.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/*<Header />*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="camera/:taskId" element={<Camera/>}/>
          <Route path="/create-task" element={<CreateTask/>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
    </>
  )
}

export default App
