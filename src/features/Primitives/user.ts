import { onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { User, onIdTokenChanged } from "firebase/auth";
import { auth } from "~/lib/firebase";
type Auth = {
	data: User | null;
	loading: boolean;
	error: Error | null;
};
export const createUser = () => {
	// Props to Solid-Firebase 'useAuth' hook for this solution. Just implement a workaround for the 'loading' state.
	const [user, setUser] = createStore<Auth>({
		loading: true,
		data: auth.currentUser,
		error: null,
	});
	const unsub = onIdTokenChanged(
		auth,
		(authUser) => {
			setUser(
				reconcile({
					loading: false,
					data: authUser,
					error: null,
				}),
			);
		},
		(error) => {
			setUser(
				reconcile({
					loading: false,
					data: null,
					error,
				}),
			);
		},
	);
	onCleanup(unsub);
	return { user };
};
