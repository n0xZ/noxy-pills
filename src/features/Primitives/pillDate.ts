import { defineRemainingTime } from "~/utils/remaining-time";

export const createPillDate = (
	pillCreatedAtDate: { seconds: number; nanoseconds: number },
	pillFrequency: number,
) => {
	const milliseconds =
		pillCreatedAtDate.seconds * 1000 + pillCreatedAtDate.nanoseconds / 1000000;
	const pillDate = new Date(milliseconds);
	const actualDate = new Date();
	const nextDose = (pillDate.getHours() + pillFrequency) % 24;
	const actualHour = actualDate.getHours();
	const remainingTime = defineRemainingTime(actualHour, nextDose);
	const pillDateParsed = pillDate.toISOString().split("T")[0];
	const pillTime = +pillDate.toISOString().split("T")[1].split(":")[0];
	return { remainingTime, pillDateParsed, pillTime };
};
