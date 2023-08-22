import { object, string, email,Output } from "valibot";

export const credentialsSchema = object({
  email: string([email("Campo requerido")]),
  password: string(),
});

export type CredentialsOutput = Output<typeof credentialsSchema>