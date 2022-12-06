import React from 'react';
import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

interface TopPanelProps {
	className?: string;
}

const TopPanel: FC<TopPanelProps> = ({ className }) => {
	return (
		<header className={`${className} container`}>
			<h1>
				<span>Marvel</span> information portal
			</h1>
			<nav>
				<NavLink to='/'>Characters</NavLink>
				<NavLink to='/comics'>Comics</NavLink>
			</nav>
		</header>
	);
};

export default styled(TopPanel)`
	margin-top: var(--main-offset);
	display: flex;
	justify-content: space-between;
	align-items: center;

	font-weight: 700;

	@media (max-width: 450px) {
		flex-direction: column;
	}

	h1 {
		span {
			color: var(--main-color);
		}
	}

	nav {
		font-size: 24px;
		font-weight: 700;
		color: #000;

		a {
			transition: 0.4s color;

			&:not(:last-child):after {
				margin: 0 10px;
				content: '/';
				color: #000;
			}

			&.active {
				color: var(--main-color);
			}

			@media (max-width: 720px) {
				font-size: 22px;
			}
			@media (max-width: 500px) {
				font-size: 20px;
			}
		}
	}
`;