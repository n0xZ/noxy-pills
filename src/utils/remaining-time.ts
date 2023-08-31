export const defineRemainingTime = (
	actualHour: number,
	comparingHour: number,
) => {
	if (actualHour <= comparingHour) {
		return comparingHour - actualHour;
	} else {
		return 24 - actualHour + comparingHour;
	}
};
