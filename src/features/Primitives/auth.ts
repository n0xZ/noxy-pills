import { useNavigate } from "@solidjs/router";
import { createMutation } from "@tanstack/solid-query";

import { createSignal } from "solid-js";
import { ValiError, safeParse } from "valibot";

import { signInViaEmail } from "~/services/auth";
import { CredentialsOutput, credentialsSchema } from "~/utils/valibot";

export const createAuth = () => {
  const [formErrors, setFormErrors] = createSignal<ValiError>({} as ValiError);
  const { data, mutate, isLoading, error } = createMutation(signInViaEmail, {
    onError(e: Error) {
      return e.message;
    },
  });
  const navigate = useNavigate();

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
      mutate(formResult.data);
      if (data) navigate("/home");
    }
  };

  return {
    signIn,
    isLoading,
    authErrors: error,
    containsFormErrors,
    errorFromField,
  };
};
