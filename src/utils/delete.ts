type executionDelay = 1000 | 1500 | 2000 | 2500 | 15000;

const wait = (ms: executionDelay) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const doAfter = async (ms: executionDelay, fn: () => unknown) => {
	await wait(ms);
	return fn();
};

export {
	wait,
	doAfter
};