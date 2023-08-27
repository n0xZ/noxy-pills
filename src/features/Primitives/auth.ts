import { useNavigate } from "@solidjs/router";
import { createMutation } from "@tanstack/solid-query";
import { signOut } from "firebase/auth";
import { createEffect, createSignal } from "solid-js";
import { ValiError, safeParse } from "valibot";
import {useAuth} from 'solid-firebase'
import { auth } from "~/lib/firebase";

import { signInViaEmail, signUpViaEmail } from "~/services/auth";
import { CredentialsOutput, credentialsSchema } from "~/utils/valibot";

export const createAuth = () => {
  const [formErrors, setFormErrors] = createSignal<ValiError>({} as ValiError);
  const {data} = useAuth(auth)
  const signInMutation = createMutation(signInViaEmail, {
    onError(e: Error) {
      return e.message;
    },
  });
  const signUpMutation = createMutation(signUpViaEmail, {
    onError(e: Error) {
      return e.message;
    },
  });
  const navigate = useNavigate();

  /**
This should work
 */
  const containsFormErrors = (key: keyof CredentialsOutput) =>
    formErrors().issues &&
    formErrors().issues.some((i) => i.path?.[0].key === key);

  const errorFromField = (key: keyof CredentialsOutput) => {
    const error = formErrors().issues?.find((i) => i.path?.[0].key === key);
    return error?.message;
  };

  const signIn = async (
    e: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fields = Object.fromEntries(formData);
    const formResult = safeParse(credentialsSchema, fields);

    if (!formResult.success) {
      setFormErrors({ ...formErrors(), formErrors: formResult.error });
    } else {
      signInMutation.mutate(formResult.data);
    }
  };
  const logout = async () => await signOut(auth);
  const signUp = async (
    e: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fields = Object.fromEntries(formData);
    const formResult = safeParse(credentialsSchema, fields);

    if (!formResult.success) {
      setFormErrors({ ...formErrors(), formErrors: formResult.error });
    } else {
      signUpMutation.mutate(formResult.data);
    }
  };
  createEffect(() => {
    if (signInMutation.isSuccess || signUpMutation.isSuccess || data) {
      navigate("/home");
    }
  });
  return {
    signUpMutation,
    signInMutation,
    containsFormErrors,
    errorFromField,
    signIn,
    signUp,
    logout,
  };
};
