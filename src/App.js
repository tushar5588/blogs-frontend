import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddBlog from './pages/AddBlog';
import Details from './pages/Details';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/add' element={<AddBlog/>} />
        <Route path='*' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
