import { css } from 'styled-components';

export const lineClamp = (qty: number) => css`
	display: -webkit-box;
	-webkit-line-clamp: ${qty};
	-webkit-box-orient: vertical;  
	overflow: hidden;
`;


