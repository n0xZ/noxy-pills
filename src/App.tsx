import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { Toaster } from "solid-toast";
const Home = lazy(() => import("./features/Landing/pages/landing"));
const Login = lazy(() => import("./features/Login/pages/login"));
const Register = lazy(() => import("./features/Register/pages/register"));
const HomeOutlet = lazy(() => import("./features/Home/pages/home.outlet"));
const HomeGeneral = lazy(() => import("./features/Home/pages/index"));
const CreatePills = lazy(() => import("./features/Home/pages/pills/create"));
function App() {
	return (
		<>
			<Routes>
				<Route path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/home" component={HomeOutlet}>
					<Route path="/" component={HomeGeneral} />
					<Route path="/pills/create" component={CreatePills} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
