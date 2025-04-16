import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import  { Main} from './pages/main/mane'
import { Login } from './pages/login'
import { Navbar } from './components/navbar'
import { useEffect } from 'react'
import {auth} from './config/firebase'
import { Createpost } from './pages/create-post/createpost'
function App() {
  useEffect(() => {
    // Sign out the user when the app loads
    auth.signOut().then(() => {
        console.log("User signed out on app load");
    });
}, []);

  return (
    <>
     <div id='root'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/createpost' element={<Createpost />} />
        </Routes>
      </Router>
     </div>
    </>
  )
}

export default App
//If you find yourself rebuilding and deploying frequently, you can automate the process using a single command. Add a custom script to your package.json:

//"scripts": {
//  "build": "vite build",
//  "deploy": "npm run build && firebase deploy --only hosting"
//}
// Now, you can rebuild and deploy with a single command:
// npm run dev