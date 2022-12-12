import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

interface Props {
	className?: string;
	message?: string;
}

const NotFoundPage: FC<Props> = ({ className, message = 'Page Not Found' }) => {
	const navigate = useNavigate();
	return (
		<main className={className}>
			<div className="container">
				{message}

				<br />

				<Button
					isColored
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
			</div>
		</main>
	);
};

export default styled(NotFoundPage)`
	margin-top: var(--main-offset);
	text-align: center;
	font-size: 20px;

	@media screen and (max-width: 480px) {
		font-size: 18px;
	}

	button {
		display: inline-block;
		margin-top: 20px;
	}
`;