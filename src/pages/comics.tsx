import React, { FC } from "react";
import styled from "styled-components";
import Baner from "../components/comics/Baner";
import ComictsShowcase from "../components/comics/ComictsShowcase";

interface ComicsPageProps {
	className?: string;
}

const ComicsPage: FC<ComicsPageProps> = ({ className }) => {
	return (
		<main className={className}>
			<div className="container">
				<Baner />

				<ComictsShowcase />
			</div>
		</main>
	)
};

export default styled(ComicsPage)`
	
`;