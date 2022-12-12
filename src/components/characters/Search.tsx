import React, { FC, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import useAutoHideMessage from "../../hooks/use-auto-hide-message";
import { getCharacterByName, resetCharactersErrorIn, selectCharacter } from "../../redux/slices/characters";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Button from "../Button";
import Immage from "../Immage";
import Spiner from "../Spiner";

interface SearchProps {
	className?: string;
}

const Search: FC<SearchProps> = ({ className }) => {
	const [query, setQuery] = useState<string>('');
	const [errorMsg, setErrorMsg] = useAutoHideMessage();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.characters.search.data);
	const status = useAppSelector(state => state.characters.search.status);

	useEffect(() => {
		if (status === 'error') {
			setErrorMsg(`Character ${query} not found`, 5000);
			dispatch(resetCharactersErrorIn('search'));
		}
	}, [status]);

	const handler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!query) return;

		if (query.length < 3) setErrorMsg('The name must be longer than 3 characters', 3000);
		else {
			dispatch(getCharacterByName(query));
			setErrorMsg(null); // reset error msg
		}
	};

	return (
		<section className={className}>
			<h4>Or find a character by name:</h4>
			<form
				onSubmit={handler}>
				<input
					autoComplete="off"
					value={query}
					name='name'
					onChange={(e) => setQuery(e.target.value)}
					type="search"
					placeholder="Enter name"
					required
				/>
				<Button
					isColored
				>
					Find
				</Button>
			</form>

			{errorMsg ? (
				<div className="error-msg">{errorMsg}</div>
			) : null}

			{status === 'fetching' ? (
				<Spiner />
			) : null}

			{data && data.length ? (
				<div className="results">
					<h5>There is!</h5>

					{data.map(char => (
						<div key={char.id} className="results__item">
							<Immage thumbnail={char.thumbnail} alt={char.name} />
							<div
								onClick={() => dispatch(selectCharacter(char.id))}
								className="results__name"
							>
								{char.name}
							</div>
							<Button as={char.wiki ? 'link' : 'empty-link'} href={char.wiki ?? undefined}>Wiki</Button>
						</div>
					))}
				</div>
			) : null}
		</section>
	);
};

export default styled(Search)`
  padding: 25px;
	box-shadow: var(--container-shadow);
	background-color: var(--main-bg-color);

	@media screen and (max-width: 889px) {
		padding: 20px;
	}

	form {
		display: flex;
	}

	input {
		flex: 1 1 100px;
		width: 100%;  // fix input width
		padding: 5px 10px;
    box-shadow: 0px 2px 3px 3px rgb(0 0 0 / 10%);
		border: none;
		font-size: 16px;
	}
	input::placeholder {
		font-size: 16px;
		color: #6b6b6b;
	}

	input:focus {
		outline-offset: -3px;
	}

	button {
		margin-left: 25px;
		flex: 0 0 100px;

		@media screen and (max-width: 480px) {
			flex: 0 0 40px;
			margin-left: 20px;
		}
	}

	.error-msg {
		color: var(--main-color);
	}

	h5 {
		color: #03710E;
	}

	h5,
	.error-msg  {
		font-size: 18px;
		font-weight: 700;
	}

	> *:not(:last-child) {
		padding-bottom: 20px;
	}

	.results {
		&__item {
			display: flex;
			align-items: center;
			border-bottom: .3px solid #9c9c9c;
			
			cursor: pointer;
			position: relative;

			/* For transition background */
			/* In CSS, we can't transition a background gradient. */
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 75%;
				height: 100%;
				background: linear-gradient(to right, #e2e2e2 0%, var(--main-bg-color) 100%);
				opacity: 0;
				transition: all 0.3s ease;
				z-index: 1;
			}

			&:hover::before {
				opacity: 1;
			}
		}

		${Immage} {
			flex: 0 0 32px;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			overflow: hidden;

			position: relative;
			z-index: 2;
		}

		&__name {
			flex: 1 1 auto;
			
			margin-right: 20px;
			padding: 15px 10px;
			
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

			position: relative;
			z-index: 2;

		}
	}

`;