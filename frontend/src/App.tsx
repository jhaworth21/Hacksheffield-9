import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./routes/home.tsx";
import Tasks from "./routes/tasks.tsx";
import Header from "./components/header.tsx";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="tasks" element={<Tasks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
