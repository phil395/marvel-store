import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface CardSkeletonProps {
	className?: string;
	withoutHeader?: boolean;
}

const CardSkeleton: FC<CardSkeletonProps> = ({ className, withoutHeader = false }) => {
	return (
		<section className={className}>
			{withoutHeader
				? null
				: <h4>Please select a character to see information</h4>}
			<div className='header'>
				<div></div>
				<div></div>
			</div>
			<div className='body'>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</section>
	);
};

const animation = keyframes`
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.5;
	}

	100% {
		opacity: 1;
	}
`;

export default styled(CardSkeleton)`
	padding: 25px;
	box-shadow: var(--container-shadow);
	background-color: var(--main-bg-color);

	h4 {
		margin-bottom: 30px;
		text-align: center;
	}

	> div *{
		animation: ${animation} 2s ease-in-out 0.5s infinite;
	}

	.header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		opacity: 0.25;


		div:first-child {
			flex: 0 0 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 100%;
			background-color: var(--skeletone-color-1);
		}

		div:last-child {
			flex: 1 1 auto;
			height: 15px;
			background-color: var(--skeletone-color-1);
		}
	}

	.body {
		opacity: 0.25;

		div {
			height: 35px;
		}
		div:nth-child(1) {
			background: var(--skeletone-color-2);
		}
		div:nth-child(2) {
			background: var(--skeletone-color-3);
		}
		div:nth-child(3) {
			background: var(--skeletone-color-4);
		}

		div:not(:last-child) {
			margin-bottom: 15px;
		}
	}
`;