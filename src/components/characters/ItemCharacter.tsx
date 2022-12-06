import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import { lineClamp } from '../../assets/styles/templates';
import { ICharacter } from '../../models/character';
import { useAppDispatch } from '../../redux/store';
import { selectCharacter } from '../../redux/slices/characters';
import Immage from '../Immage';

interface ItemCharacterProps extends Pick<ICharacter, 'id' | 'name' | 'thumbnail'> {
	className?: string;
	position: number;
	selectItem: (node: HTMLElement) => void;
}

const ItemCharacter: FC<ItemCharacterProps> = ({ className, id, name, thumbnail, selectItem }) => {

	const dispatch = useAppDispatch();

	const handler = (e: React.MouseEvent<HTMLElement>) => {
		selectItem(e.currentTarget);
		dispatch(selectCharacter(id));
	};

	return (
		<article
			className={className}
			onClickCapture={handler}
		>
			<Immage thumbnail={thumbnail} alt={name} />
			<div className='name'>
				<h3>{name}</h3>
			</div>

		</article>
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

export default styled(ItemCharacter)`
	box-shadow: var(--container-shadow);
	animation: ${renderAnimation} 1s ease-in ${props => (props.position % 12) / 5}s 1 normal backwards;
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.6s ease;
	display: flex;
	flex-direction: column;
	min-height: 200px;

	${Immage} {
		height: 65%;
	}
	/* .img {
		height: 65%;

		img {
			pointer-events: none;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	} */

	.name {
		height: 35%;
		padding: 15px;
		background-color: #232222;
		color: var(--main-bg-color);

		h3 {
			text-transform: uppercase;
			${lineClamp(2)}
		}
	}
`;
