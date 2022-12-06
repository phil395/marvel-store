import React, { FC } from "react";
import styled from "styled-components";
import useBackgroundLoadingImg from "../hooks/use-bg-loading-img";
import Spiner from "./Spiner";

interface ImmageProps {
	className?: string;
	thumbnail: string;
	alt: string;
}

const Immage: FC<ImmageProps> = ({ className, thumbnail, alt }) => {
	const { isLoadingImg } = useBackgroundLoadingImg(thumbnail);

	return (
		<div className={className}>
			{isLoadingImg
				? <Spiner />
				: <img src={thumbnail} alt={alt} />}
		</div>
	)
};

export default styled(Immage)`
	img {
		pointer-events: none;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;