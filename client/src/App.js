import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth } from './utils/CheckAuth';
import Home from './components/home';
import LoginModal from './components/login';
import Stretching from './pages/stretching';
import StretchingAll from './pages/stretchingAll';
import OAuth from './pages/oauth';
import TurtleTest from './pages/turtleTest';

function App() {
  const showLogin = useSelector(state=>state.modal.showLogin);

  useEffect(()=>{
    checkAuth();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/stretching">
            <Route index element={<StretchingAll />}/>
            <Route path=":stretchingId" element={<Stretching />}/>
          </Route>
          <Route path="/test/turtleneck" element={<TurtleTest />}/>
          <Route path="/oauth" element={<OAuth />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      { showLogin && <LoginModal /> }
      {/* <MeasuerPose /> */}
    </div>
  );
}

export default App;
