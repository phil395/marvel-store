import React, { FC } from "react";
import styled from "styled-components";

import decoration from '../../assets/img/baner-img.png'
import logo from '../../assets/img/baner-logo.png'

interface BanerProps {
	className?: string;
}

const Baner: FC<BanerProps> = ({ className }) => {
	return (
		<div className={className}>
			<img src={decoration} alt="baner decoration" />
			<h3>New comics every week! <br />
			Stay tuned! </h3>
			<img src={logo} alt="baner logo" />
		</div>
	)
};

export default styled(Baner)`
	margin: var(--main-offset) 0;

	min-height: 100px;
	padding: 20px;

	position: relative;
	background-color: #000;
	box-shadow: var(--container-shadow);


	h3 {
		margin-left: 280px;
		font-size: 24px;
		font-weight: 700;
		color: #fff
	}

	img:first-child {
		position: absolute;
		left: 45px;
		top: 0;
	}

	img:last-child {
		position: absolute;
		right: 25px;
		top: 0;
	}

	@media screen and (max-width: 800px) {
		h3 {
			margin-left: 180px;
		}

		img:first-child {
			left: 15px;
		}

		img:last-child {
			right: 15px;
		}
	}

	@media screen and (max-width: 650px) {

		min-height: 80px;

		h3 {
			margin-left: 0px;
			font-size: 18px;
		}

		img:first-child {
			display: none;
		}

		img:last-child {
			top: 7px;
			height: 75px;
		}
	}

	@media screen and (max-width: 360px) {

		img:last-child {
			display: none;
		}
	}

`;