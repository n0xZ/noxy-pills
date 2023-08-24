import { Routes, Route } from "@solidjs/router";
import { lazy } from "solid-js";
const Home = lazy(() => import("./features/Landing/pages/landing"));
const Login = lazy(() => import("./features/Login/pages/login"));
function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Routes>
  );
}

export default App;
