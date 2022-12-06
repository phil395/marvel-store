import React, { FC } from 'react';
import styled from 'styled-components';
import { ICharacter } from '../../../models/character';
import { useAppSelector } from '../../../redux/store';
import Spiner from '../../Spiner';
import RandomCharacter from './RandomCharacter';
import RandomCta from './RandomCta';
import RandomMsg from './RandomMsg';



interface RandomCharacterProps {
	className?: string;
}

const RandomContainer: FC<RandomCharacterProps> = ({ className }) => {

	const status = useAppSelector(state => state.characters.random.status);
	const character = useAppSelector(state => state.characters.random.data);

	const renderMap: Record<typeof status, any> = {
		'initial': <RandomMsg />,
		'fetching': <Spiner />,
		'idle': <RandomCharacter {...character as ICharacter} />,
		'error': null
	};

	return (
		<section className={className}>

			<div className='main'>
				{renderMap[status]}
			</div>

			<RandomCta />
		</section>
	);
};

export default styled(RandomContainer)`
	display: flex;
	flex-wrap: wrap;

	box-shadow: var(--container-shadow);

	.main {
		padding: 20px;
		width: 100%;
		height: 230px;

		@media (max-width: 500px) {
			min-height: 180px;
			height: auto
		}
	}

	@media (min-width: 990px) {
		> * {
			flex: 1 1 50%
		}
	}
`;