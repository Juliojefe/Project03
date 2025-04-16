import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signUp';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}

// removed to solve merge conflict
// import StackNavigator from './navigation/StackNavigator';
//
// export default function App() {
//     return <StackNavigator />;
// }