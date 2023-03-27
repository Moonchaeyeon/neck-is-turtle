import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth } from './utils/function/CheckAuth';
import Home from './components/home';
import LoginModal from './components/login';
import Stretching from './pages/stretching';
import StretchingAll from './pages/stretchingAll';
import OAuth from './pages/oauth';
import TurtleTest from './pages/turtleTest';
import TurtleTestResult from './pages/turtleTest/result';
import Report from './components/report';
import CheckPose from './pages/checkPose';
import ReportChatbot from './pages/reportChatbot';
import ReportDay from './pages/reportDay';

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
          <Route path="/test/turtleneck">
            <Route index element={<TurtleTest />}/>
            <Route path="result" element={<TurtleTestResult />}/>
          </Route>
          <Route path="/report/day/:day" element={<ReportDay />}/>
          <Route path="/report/chatbot" element={<ReportChatbot />}/>
          <Route path="/oauth" element={<OAuth />}/>
          <Route path="/check-pose" element={<CheckPose />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      { showLogin && <LoginModal /> }
      {/* <MeasuerPose /> */}
    </div>
  );
}

export default App;
