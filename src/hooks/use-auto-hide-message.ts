import { useCallback, useRef, useState } from "react";

const useAutoHideMessage = () => {
	const [message, setMessage] = useState<string | null>(null);
	const timerId = useRef<null | NodeJS.Timeout>(null);

	const handler = useCallback((msg: typeof message, ms: number = 3000) => {
		if (timerId.current) clearTimeout(timerId.current);
		setMessage(msg);
		timerId.current = setTimeout(setMessage, ms, null);
	}, []);



	return [message, handler] as [typeof message, typeof handler];
};

export default useAutoHideMessage;