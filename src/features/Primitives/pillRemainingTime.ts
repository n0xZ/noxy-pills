import { defineRemainingTime } from "~/utils/remaining-time";

export const createPillRemainingTime = (
	pillCreatedAtDate: { seconds: number; nanoseconds: number },
	pillFrequency: number,
) => {
	const milliseconds =
		pillCreatedAtDate.seconds * 1000 + pillCreatedAtDate.nanoseconds / 1000000;
	const pillDate = new Date(milliseconds);
	const actualDate = new Date();
	const nextDose = (pillDate.getHours() + pillFrequency) % 24;
	const actualHour = actualDate.getHours();
	const remaining = defineRemainingTime(actualHour, nextDose);
	return { remaining };
};
