import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const variables = {
	itemWidth: 15,
	itemHeight: 60,
	offset: 15,
	opacity: 0.45,
	getBoxSize(width?: number, offset?: number) {
		return (width ?? this.itemWidth) * 4 + (offset ?? this.offset) * 3;
	}
};

interface SpinerProps {
	itemWidth?: number;
	itemHeight?: number;
	offset?: number;
	opacity?: number;
}

const Spiner: FC<SpinerProps> = ({ itemWidth, itemHeight, offset, opacity }) => {
	return (
		<Wrapper
			opacity={opacity}
		>
			<Inner
				itemWidth={itemWidth}
				itemHeight={itemHeight}
				offset={offset}
			>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</Inner>
		</Wrapper>
	);
};


type WrapperProps = {
	opacity?: number;
};
type InnerProps = {
	itemWidth?: number;
	itemHeight?: number;
	offset?: number;
};

const spinerAnimation = keyframes`
	0% { 
		opacity: 1 
	}
	50% {
		opacity: .5 
	}
	100% {
		opacity: 1 
	}
`;

const pulseAnimation = keyframes`
	from {
		transform: scale(1) rotate(2deg);
	} 
	to {
		transform: scale(0.7) rotate(-2deg);
	}
`;

const Wrapper = styled.div<WrapperProps>`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: ${props => props.opacity || variables.opacity};
	animation: ${pulseAnimation} 1.5s ease-in-out 0s infinite alternate-reverse;
	cursor: wait;
`;

const Inner = styled.div<InnerProps>`
	width: ${props => {
		if (props.itemWidth || props.offset) return variables.getBoxSize(props.itemWidth, props.offset);
		else return variables.getBoxSize();
	}}px;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	div {
		width: ${props => props.itemWidth || variables.itemWidth}px;
		height: ${props => props.itemHeight || variables.itemHeight}px;
		animation: ${spinerAnimation} 1s cubic-bezier(0.5,0,0.5,1) infinite;
	}
	div:nth-child(1) {
		background: var(--skeletone-color-1);
		animation-delay: -0.6s;
	}
	div:nth-child(2) {
		background: var(--skeletone-color-2);
		animation-delay: -0.4s;
	}
	div:nth-child(3) {
		background: var(--skeletone-color-3);
		animation-delay: -0.2s;
	}
	div:nth-child(4) {
		background: var(--skeletone-color-4);
		animation-delay: -1s;
	}
`;

export default Spiner;