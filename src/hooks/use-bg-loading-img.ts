import { useState, useEffect } from "react";

const useBackgroundLoadingImg = (imgSrc: string) => {
	const [isLoadingImg, changeisLoadingImg] = useState(true);

	useEffect(() => {
		const characterImg = new Image();
		characterImg.src = imgSrc;

		characterImg.addEventListener('load', () => {
			changeisLoadingImg(false);
		}, { once: true });

	}, [imgSrc]);

	return { isLoadingImg };
};

export default useBackgroundLoadingImg;