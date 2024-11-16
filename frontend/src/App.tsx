import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./routes/home.tsx";
import Tasks from "./routes/tasks.tsx";
import Camera from "./routes/camera.tsx";
import CreateTask from "./routes/createTask.tsx";
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton  from './components/login.tsx'
import LogoutButton from './components/logout.tsx';

function App() {
  return (
    <>
      <Auth0Provider
      domain="dev-s5ynupfjsplm2b3x.us.auth0.com"
      clientId="93ajc3U7fnprGkkgZ5d8LPkLAfmfsNg5"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/callback"
      }}
      >
        {/*<Header />*/}
        <LoginButton/>
        <LogoutButton/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="tasks" element={<Tasks/>}/>
            <Route path="camera/:taskId" element={<Camera />}/>
            <Route path="/create-task" element={<CreateTask/>}/>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  )
}

export default App
