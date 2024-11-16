import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from "./routes";
import Tasks from "./routes/tasks.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="tasks" element={<Tasks/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
