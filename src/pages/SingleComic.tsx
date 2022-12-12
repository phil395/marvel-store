import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Baner from "../components/comics/Baner";
import Immage from "../components/Immage";
import { getComicFromHistory, resetComicsErrorIn, selectComic } from "../redux/slices/comics";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface SingleComicProps {
	className?: string;
}

const SingleComicPage: FC<SingleComicProps> = ({ className }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const comic = useAppSelector(state => state.comics.selected.data);
	const status = useAppSelector(state => state.comics.selected.status);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === 'initial' && id) {

			// wait until the state is restored from LocalStorage
			setTimeout(() => {
				dispatch(getComicFromHistory(parseInt(id)));
			}, 100);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (status === 'idle' && id) dispatch(selectComic(parseInt(id)));
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (status === 'error') {
			navigate('/comics');
			dispatch(resetComicsErrorIn('selected'));
		}
		// eslint-disable-next-line
	}, [status]);

	if (!comic) return null;

	return (
		<main className={className}>
			<div className="container">
				<Baner />

				<section>
					<Immage thumbnail={comic.thumbnail} alt={comic.title} />
					<div className="content">
						<h3>{comic.title}</h3>
						<p>{comic.description.length > 5
							? comic.description
							: 'Sorry we don\'t have a description for this comic'}</p>
						<div className="pages">{comic.pageCount} pages</div>
						<div className="language">{comic.language ? `Language: ${comic.language}` : null}</div>
						<div className="price">{comic.prices}$</div>
					</div>
					<button onClick={() => navigate(-1)}>Back to all</button>
				</section>
			</div>

		</main>
	);
};

export default styled(SingleComicPage)`
	section {
		margin: var(--main-offset) 0;

		display: grid;
		gap: 25px;
		grid-template:
			'immage texts button'
			/ auto 1fr auto;

		button {
			grid-area: button;
			align-self: flex-start;
			padding: 0;
			background: none;
			border: none;
			font-size: inherit;
			font-family: inherit;
			cursor: pointer;
			font-weight: 700;
			letter-spacing: 1px;
			text-align: left;
		}

	}

	.content {
		grid-area: texts;

		h3 {
			font-weight: 700;
			font-size: 22px;
		}

		p,
		.pages,
		.language {
			font-size: 18px;
		}

		.price {
			font-size: 24px;
			font-weight: 700;
			color: var(--main-color);
		}

		> *:not(:last-child) {
			margin-bottom: 25px;
		}
	}

	${Immage} {
		grid-area: immage;
		width: 300px;
		height: 450px;
		box-shadow: var(--container-shadow);

	}

	@media screen and (min-width: 480px) and (max-width: 900px) {
		section {
			grid-template: 
				'button .'
				'immage texts'
				/ auto 1fr
			;
		}
	}

	@media screen and (max-width: 710px) {
		${Immage} {
			grid-area: immage;
			width: 200px;
			height: 300px;
		}
	}

	@media screen and (max-width: 479px) {
		section {
			grid-template: 
				'button'
				'immage'
				'texts'
				/ auto 
			;
			justify-items: center;

			button {
				width: 100%;
			}
		}

		${Immage} {
			grid-area: immage;
			width: 200px;
			height: 300px;
		}
	}
`;