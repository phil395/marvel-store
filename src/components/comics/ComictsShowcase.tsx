import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { fillComicsShowcase } from "../../redux/slices/comics";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Button from "../Button";
import Spiner from "../Spiner";
import ItemComic from "./ItemComic";

interface ComicsShowcaseProps {
	className?: string;
}

const ComicsShowcase: FC<ComicsShowcaseProps> = ({ className }) => {

	const status = useAppSelector(state => state.comics.showcase.status);
	const comics = useAppSelector(state => state.comics.showcase.data);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === 'initial') {

			// wait until the state is restored from LocalStorage
			setTimeout(() => {
				dispatch(fillComicsShowcase());
			}, 100);
		}
		// eslint-disable-next-line
	}, [])

	return (
		<section className={className}>
			<div className="inner">
				{comics.map(({id, title, thumbnail, prices}) => (
					<ItemComic key={id} title={title} thumbnail={thumbnail} prices={prices} id={id} />
				))}
			</div>

			{status === 'fetching' || status === 'initial' ? (
				<div><Spiner /></div>
			) : null}

			{status === 'idle' ? (
				<Button
					isColored
					isWide
					onClick={() => dispatch(fillComicsShowcase())}
				>
					Load More
				</Button>
			) : null}
		</section>
	)
};

export default styled(ComicsShowcase)`
	
	margin: var(--main-offset) 0;

	.inner {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 65px;
	}

	button {
		display: block;
		margin: 0 auto;
	}

	>*:not(:last-child) {
		margin-bottom: var(--main-offset);
	}


	@media screen and (min-width: 870px) and (max-width: 980px) {
		${ItemComic} {
			--img-height: 290px;
		}
	}

	@media screen and (min-width: 540px) and (max-width: 869px) {
		.inner {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (max-width: 700px) {
		.inner {
			gap: 45px;
		}

		${ItemComic} {
			--img-height: 250px;
		}
	}

	@media screen and (max-width: 540px) {
		.inner {
			grid-template-columns: repeat(2, 1fr);
			gap: 25px;
		}
	}

	@media screen and (max-width: 350px) {
		.inner {
			grid-template-columns: repeat(1, 1fr);
			gap: 35px;
		}
	}


`;