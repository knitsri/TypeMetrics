import './App.css'
import Challenge from './components/Challenge';
import Home from './components/Home'
import InstructionsPage from './components/InstructionsPage';
import LoginForm from './components/LoginForm'
import { Routes, Route } from "react-router-dom";
import Context from './Context/Context'
import Scores from './components/Scores';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
      <Context>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/instructions" element={<ProtectedRoute><InstructionsPage /></ProtectedRoute>} /> 
            <Route path="/challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>}/>
            <Route path="/scores" element={<ProtectedRoute><Scores/></ProtectedRoute>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Context>
  )
}


export default App
