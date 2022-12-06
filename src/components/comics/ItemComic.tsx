import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lineClamp } from "../../assets/styles/templates";
import Immage from "../Immage";

interface ItemComicProps {
	className?: string;
	id: number;
	title: string;
	thumbnail: string;
	prices: number;
}

const ItemComic: FC<ItemComicProps> = ({ className, id, title, thumbnail, prices }) => {
	return (
		<Link to={id.toString()} >
			<article className={className}>
				<Immage thumbnail={thumbnail} alt={title} />
				<h3>{title}</h3>
				<div className="price">{prices}$</div>
			</article>
		</Link>
	)
};

export default styled(ItemComic)`
	--img-height: 340px;

	${Immage} {
		height: var(--img-height);
		box-shadow: var(--container-shadow);
		
	}

	h3 {
		--font-size: 16px;

		height: 36px;
		font-weight: 700;
		font-size: 16px;
		line-height: 18px;
		${lineClamp(2)}
	}

	.price {
		font-weight: 700;
		font-size: 14px;
		color: #5f5f5f;
	}

	*:not(:last-child) {
		margin-bottom: 10px;
	}

	
	
`;