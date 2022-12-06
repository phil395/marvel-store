import React, { FC } from 'react';
import styled from 'styled-components';

import Button from './Button';

interface ButtonGroupProps {
	className?: string;
	wiki?: string | null;
	urlPath?: string;
}

const ButtonsGroup: FC<ButtonGroupProps> = ({ className, wiki, urlPath }) => {
	return (
		<div className={className}>
			<Button
				as='router-link'
				to={urlPath}
				isColored
			>
				HomePage
			</Button>
			<Button as={wiki ? 'link' : 'empty-link'} href={wiki ?? undefined}>Wiki</Button>
		</div>
	);
};


export default styled(ButtonsGroup)`
	display: flex;

	> *:not(:last-child) {
		margin-right: 30px;
	}
`;