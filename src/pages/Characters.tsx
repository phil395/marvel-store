import React, { FC } from "react";
import styled from "styled-components";

import bgDecoration from '../assets/img/decoration-bg.png';
import CharactersContainer from "../components/characters/CharactersContainer";
import RandomContainer from "../components/characters/random/RandomContainer";


interface CharactersPageProps {
	className?: string;
}

const CharactersPage: FC<CharactersPageProps> = ({ className }) => {
	return (
		<main className={className}>
			<div className="container">
				<RandomContainer />

				<CharactersContainer />
			</div>
		</main>
	);
};

export default styled(CharactersPage)`
	background: url(${bgDecoration}) calc(50% + 450px) 100% / auto no-repeat;

  > div > * {
    margin: var(--main-offset) 0;
  }
`;