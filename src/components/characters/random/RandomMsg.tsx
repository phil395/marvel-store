import React, { FC } from "react";
import styled from "styled-components";

interface RandomMsgProps {
	className?: string;
}

const RandomMsg: FC<RandomMsgProps> = ({ className }) => {
	return (
		<div className={className}>
			<div>
				Click to search random character
			</div>
		</div>
	);
};

export default styled(RandomMsg)`
	display: flex;
	height: 100%;

	justify-content: center;
	align-items: center;

	text-align: center;
`;