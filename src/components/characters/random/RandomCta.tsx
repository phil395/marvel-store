import React, { FC } from 'react';
import styled from 'styled-components';
import decorationImg from '../../../assets/img/decoration-random-generator.png';
import Button from "../../Button";
import { getRandomCharacter } from '../../../redux/slices/characters';
import { useAppDispatch } from '../../../redux/store';


interface RandomCtaProps {
	className?: string;
}

const RandomCta: FC<RandomCtaProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	return (
		<div className={className}>
			<h3>Random character for today! Do you want to get to know him better?</h3>
			<h3>Or choose another one</h3>
			<Button
				isColored
				forBlackBG
				onClick={() => dispatch(getRandomCharacter())}
			>
				TRY IT
			</Button>
		</div>
	);
};

export default styled(RandomCta)`
	padding: 20px;
	width: 100%;
	display: flex;
	flex-direction: column;
	color: var(--main-bg-color);
	background: url(${decorationImg}) 110% 70% no-repeat #000;

	> * {
		max-width: calc(100% - 110px);
	}

	> *:not(:last-child) {
		margin-bottom: var(--paragraph-offset);
	}

	*:first-child {
		flex: 1 1 auto;
	}

	button {
		align-self: flex-start;
	}

	@media (max-width: 410px) {
		background-position: 130% 70%;
	}
	@media (max-width: 360px) {
		background-position: 145% 70%;

	}
`;