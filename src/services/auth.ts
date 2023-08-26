import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "~/lib/firebase";
import { CredentialsOutput } from "~/utils/valibot";

export const signInViaEmail = async ({
  email,
  password,
}: CredentialsOutput) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return { credentials: credentials.user };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export const signUpViaEmail = async ({email,password}:CredentialsOutput) =>{
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    return { credentials: credentials.user };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
}