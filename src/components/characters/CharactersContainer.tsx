import React, { FC } from 'react';
import styled from 'styled-components';
import CharactersShowcase from './CharactersShowcase';
import { useAppSelector } from '../../redux/store';
import CharacterCard from './CharacterCard';
import CardSceleton from './CardSceleton';
import useMatchMedia from '../../hooks/use-match-media';
import type { ICharacter } from '../../models/character';
import Portal from '../Portal';
import Modal from '../Modal';
import Search from './Search';

const LARGE_SCREEN_BREAKPOINT = 890;

interface CharactersContainerProps {
	className?: string;
}


const MainContainer: FC<CharactersContainerProps> = ({ className }) => {

	const character = useAppSelector(state => state.characters.selected);
	const isLargeScreen = useMatchMedia(`(min-width: ${LARGE_SCREEN_BREAKPOINT}px)`);

	return (
		<div className={className}>
			<CharactersShowcase />

			{isLargeScreen
				? desktopRender(character)
				: mobileRender(character)}
		</div>
	);
};

const mobileRender = (character: ICharacter | undefined) => {
	if (character) {
		return (
			<>
				<Search />
				<Portal as='modal'>
					<Modal>
						<CharacterCard {...character} />
					</Modal>
				</Portal>
			</>
		);
	}
	return <Search />;
};

const desktopRender = (character: ICharacter | undefined) => {
	if (character) {
		return (
			<aside>
				<CharacterCard {...character} />
				<Search />
			</aside>
		);
	}
	return (
		<aside>
			<CardSceleton />
			<Search />
		</aside>
	);
};

export default styled(MainContainer)`
	--offset: 25px;

	display: flex;

	${CharactersShowcase} {
		flex: 1 1 auto;
	}

	aside {
		/* flex: 0 0 420px; */
		width: 420px;  /* fix 'white-space: nowrap;' in search character by name results */
    align-self: flex-start;

    margin-left: var(--offset);

    position: sticky;
	  top: var(--offset);

		> *:not(:last-child) {
			margin-bottom: var(--offset);
		}
	}

	@media screen and (max-width: ${LARGE_SCREEN_BREAKPOINT - 1}px) {
		flex-direction: column;

		${CharactersShowcase} {
			order: 2;
		}

		${Search} {
			order: 1;
			margin-bottom: var(--main-offset);
		}
	}

`;