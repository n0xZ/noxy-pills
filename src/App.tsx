import { Routes, Route } from "@solidjs/router";
import { lazy } from "solid-js";
const Home = lazy(() => import("./features/Landing/pages/landing"));

function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      
    </Routes>
  );
}

export default App;
