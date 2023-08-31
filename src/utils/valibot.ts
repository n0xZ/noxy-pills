import {
	object,
	string,
	email,
	Output,
	array,
	number,
	date,
	parse,
	any,
} from "valibot";

export const credentialsSchema = object({
	email: string([email("Campo requerido")]),
	password: string(),
});
export const pillSchema = object({
	name: string(),
	description: string(),
	userId: string(),
	duration: number(),
	frequency: number(),
	createdAt: any(),
});
export type PillsOutput = Output<typeof pillSchema>;
export type CredentialsOutput = Output<typeof credentialsSchema>;

export type Fields = PillsOutput & CredentialsOutput;
