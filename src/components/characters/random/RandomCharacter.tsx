import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { lineClamp } from '../../../assets/styles/templates';
import ButtonsGroup from '../../ButtonsGroup';
import { ICharacter } from '../../../models/character';
import Immage from '../../Immage';


interface RandomCharacterProps extends Pick<ICharacter, 'id' | 'name' | 'description' | 'thumbnail' | 'wiki'> {
	className?: string;
}

const RandomCharacter: FC<RandomCharacterProps> = ({ className, id, name, description, thumbnail, wiki }) => {

	return (
		<div className={className}>
			<Immage thumbnail={thumbnail} alt={name} />

			<div className='content'>
				<h3>{name}</h3>
				<p>{description || 'Sorry, we don\'t have a description for this character'}</p>
				<ButtonsGroup wiki={wiki} urlPath={`characters/${id}`} />
			</div>

		</div>
	);
};

const renderAnimation = keyframes`
	0% {
		opacity: 0;
	}

	50% {
		opacity: 0.8;
	}

	100% {
		opacity: 1;
	}
`;

export default styled(RandomCharacter)`
	display: flex;
	width: 100%;
	height: 100%;

	animation: ${renderAnimation} 1s ease-in 0s 1 normal backwards;

	> *:not(:last-child) {
		margin-right: 20px;
	}

	@media (max-width: 500px) {
		flex-direction: column;

		> *:not(:last-child) {
			margin: 0 0 15px 0;
		}
	}

	/* .img {
		height: 100%;
		flex: 0 0 180px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		@media (max-width: 500px) {
			height: 230px;
			flex: 0 0 230px;
		}
	} */

	${Immage} {
		height: 100%;
		flex: 0 0 180px;

		@media (max-width: 500px) {
			height: 230px;
			flex: 0 0 230px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;

		p {
			${lineClamp(5)}
		}

		> *:last-child {     // ButtonGroup
			flex: 1 1 auto;
			align-items: flex-end;
		}
	}
`;