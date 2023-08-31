import { Routes, Route } from "@solidjs/router";
import { lazy } from "solid-js";
const Home = lazy(() => import("./features/Landing/pages/landing"));
const Login = lazy(() => import("./features/Login/pages/login"));
const Register = lazy(() => import("./features/Register/pages/register"));
const HomeOutlet = lazy(() => import("./features/Home/pages/home.outlet"));
const HomeGeneral = lazy(() => import("./features/Home/pages/index"));
function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={HomeOutlet} >
        <Route path="/" component={HomeGeneral} />
      </Route>
    </Routes>
  );
}

export default App;
