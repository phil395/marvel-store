import React, { FC, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IButton {
	children: ReactNode;
	// common
	title?: string;
	isColored?: boolean;
	isWide?: boolean;
	forBlackBG?: boolean;
	// link	
	as?: string;
	to?: To,
	href?: string;
	// target?: string;
	// btn
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IButton> = ({ as, to, href, title, children, isColored, isWide, forBlackBG, disabled, onClick }) => {

	const settings = { isColored, isWide, forBlackBG };

	if (as === 'link') {
		return (
			<Wrapper {...settings} >
				<a href={href} target="_blank" rel="noreferrer" title='You will be redirected to the marvel website'>{children}</a>
			</Wrapper>
		);
	}

	if (as === 'empty-link') {
		return (
			<Wrapper {...settings} >
				<Btn disabled title="Sory. We don't have a target link">{children}</Btn>
			</Wrapper>
		);
	}

	if (as === 'router-link' && to) {
		return (
			<Wrapper {...settings}>
				<Link to={to}>{children}</Link>
			</Wrapper>
		);
	}

	return (
		<Btn
			{...settings}
			title={title}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</Btn>
	);
};

const findColor = (bool: boolean | undefined): string => bool ? '#000' : 'var(--main-bg-color)';

type btnStylesProps = {
	isWide?: boolean;
	isColored?: boolean;
	forBlackBG?: boolean;
};

const btnStyles = css<btnStylesProps>`
	display: block;
	appearance: button;
	position: relative;
	padding: 10px ${props => props.isWide ? '50px' : '20px'};
	border: none;
	text-transform: uppercase;
	background-color: ${props => props.isColored ? 'var(--main-color)' : '#5C5C5C'};
	color: var(--main-bg-color);
	font-size: 14px;
	font-family: inherit;
	letter-spacing: 2px;
	text-align: center;
	cursor: pointer;

	&:before {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		content: '';
		border-style: solid;
		border-width: 10px 10px 0 0;
		border-color: ${props => findColor(props.forBlackBG)} transparent transparent transparent;
	}

	&:after {
		position: absolute;
		right: 0;
		bottom: 0;
		display: block;
		content: '';

		border-style: solid;
		border-width: 0 0 10px 10px;
		border-color: transparent transparent ${props => findColor(props.forBlackBG)} transparent;
	}

	&:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}
`;

const Btn = styled.button`
	${btnStyles}
`;

const Wrapper = styled.span`
	display: inline-block;
	a {
		${btnStyles}
	}
	
`;

export default Button;
