import React, { FC, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fillCharactersShowcase } from '../../redux/slices/characters';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useIsFirstRender from '../../hooks/use-is-first-render';
import { toggleActivityClass } from '../../utils/toggle-activity-class';
import Button from '../Button';
import Spiner from '../Spiner';
import ItemCharacter from './ItemCharacter';

interface CharactersShowcaseProps {
	className?: string;
}

const CharactersShowcase: FC<CharactersShowcaseProps> = ({ className }) => {

	const status = useAppSelector(state => state.characters.showcase.status);
	const characters = useAppSelector(state => state.characters.showcase.data);
	const dispatch = useAppDispatch();
	const isFirstRender = useIsFirstRender();  // for animating the appearance of items
	const selectedItem = useRef<HTMLElement>();

	useEffect(() => {
		if (status === 'initial') {

			// wait until the state is restored from LocalStorage
			setTimeout(() => {
				dispatch(fillCharactersShowcase());
			}, 100);
		}
		// eslint-disable-next-line
	}, []);



	const selectItem = useCallback((newNode: HTMLElement): void => {
		if (newNode) {
			toggleActivityClass(newNode, selectedItem.current);
			selectedItem.current = newNode;
		}
	}, []);

	return (
		<section className={className}>
			<div className='inner'>
				{characters.map(({ id, name, thumbnail }, index) => {
					return <ItemCharacter
						key={id}
						id={id}
						name={name}
						thumbnail={thumbnail}
						position={isFirstRender ? 0 : index}   // Turn off the animation delay on the first rendering for each item
						selectItem={selectItem}
					/>;
				})}
			</div>

			{status === 'fetching' || status === 'initial' ? (
				<div><Spiner /></div>
			) : null}

			{status === 'idle' ? (
				<Button
					isColored
					isWide
					onClick={() => dispatch(fillCharactersShowcase())}
				>
					Load More
				</Button>
			) : null}
		</section>
	);


};

export default styled(CharactersShowcase)`
	button {
		display: block;
		margin: 0 auto;
	}
	> *:not(:last-child) {
		margin-bottom: var(--main-offset);
	}
	.empty-block {
		height: 36px;
	}

	.inner {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		grid-auto-rows: 300px;
		grid-gap: 25px;

		@media (max-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			grid-gap: 15px;

		}
	}
`;