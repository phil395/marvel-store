import React, { FC } from "react";
import styled from "styled-components";

interface RandomMsgProps {
	className?: string;
}

const RandomMsg: FC<RandomMsgProps> = ({ className }) => {
	return (
		<div className={className}>
			Начальное состояние
		</div>
	);
};

export default styled(RandomMsg)`

`;