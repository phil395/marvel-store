import React, { FC } from 'react';
import styled from 'styled-components';
import { lineClamp } from '../../assets/styles/templates';

import ButtonsGroup from '../ButtonsGroup';
import type { ICharacter } from '../../models/character';
import Immage from '../Immage';

interface CharactersCardProps extends ICharacter {
	className?: string;
}

const CharacterCard: FC<CharactersCardProps> = ({ className, id, name, description, thumbnail, comics, wiki }) => {

	return (
		<section className={className}>

			<div className='person'>

				<div className='person__header'>
					{/* <div className='person__img'>
						<img src={thumbnail} alt={name} />
					</div> */}
					<Immage thumbnail={thumbnail} alt={name} />

					<div className='person__info'>
						<h3>{name}</h3>
						<ButtonsGroup wiki={wiki} urlPath={`characters/${id}`} />
					</div>
				</div>

				<p className='person__descr'>{description || 'Sorry, we don\'t have a description for this character'}</p>
			</div>

			{comics.length > 0 ? (
				<>
					<h4>Comics:</h4>

					<ul className='comics-list'>
						{comics.map(comic => {
							return (
								<li key={comic.title}>
									{/* <a href={comic.url ?? 'https://marvel.com'} target='_blank' rel="noreferrer">{comic.title}</a> */}
									{comic.title}
								</li>
							);
						})}
					</ul>
				</>
			) : null}
		</section>
	);
};

export default styled(CharacterCard)`
	padding: 25px;
	background-color: var(--main-bg-color);
	box-shadow: var(--container-shadow);

	.person {
		&__header {
			display: flex;

			> *:not(:last-child) {
				margin-right: 15px;
			}
		}

		${Immage} {
			flex: 0 0 150px;
			height: 150px;
		}

		&__info {
			flex: 1 1 auto;
			display: flex;
			flex-direction: column;

			h3 {
				flex: 1 1 auto;
				text-transform: uppercase;
				margin-bottom: 15px;
				${lineClamp(2)}
			}

			${ButtonsGroup} {
				flex-direction: column;
				align-self: flex-start;

				> *:not(:last-child) {
					margin: 0 0 10px 0;
				}
			}
		}

		@media screen and (max-width: 360px) {
			&__header {
				flex-direction: column;

				> *:not(:last-child) {
					margin: 0 0 15px 0;
				}
			}

			&__img {
				height: 200px;

			}

			&__info {
				${ButtonsGroup} {
					flex-direction: row;

					> *:not(:last-child) {
						margin: 0 10px 0 0;
					}
				}
			}
		}
	}

	.comics-list {
		list-style: none;
		padding: 0;
		margin: 10px 0 0 0;
		font-size: 14px;

		li {
			padding: 3px 10px;
			background-color: var(--main-bg-color);
			box-shadow: 0px 2px 3px 3px rgba(0, 0, 0, 0.1);
		}

		li:not(:last-child) {
			margin-bottom: 10px;
		}
	}
`;
