import React, { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";
import { removeSelectedCharacter } from "../redux/slices/characters";
import { useAppDispatch } from "../redux/store";

interface ModalProps {
	className?: string;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ className, children }) => {
	const dispatch = useAppDispatch();

	const modalClose = () => {
		dispatch(removeSelectedCharacter());
	};

	useEffect(() => {
		const clickHandler = (e: MouseEvent) => {
			const target = e.target as HTMLElement,
				isOverlay = target.matches('#modal-overlay'),
				isModalContainer = target.matches('.modal-container'),
				isModalClosing = target.matches('.modal-closing');

			if (isOverlay || isModalContainer || isModalClosing) modalClose();
		};

		const keyHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') modalClose();
		};

		document.body.addEventListener('click', clickHandler);
		document.body.addEventListener('keyup', keyHandler);

		return () => {
			document.body.removeEventListener('click', clickHandler);
			document.body.removeEventListener('keyup', keyHandler);
		};
	}, []);

	return (
		<div id="modal-overlay" className={className}>
			<div className="modal-container">
				<div className="modal-closing">&#10006;</div>
				{children}
			</div>
		</div>
	);
};

export default styled(Modal)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;

	overflow: auto;
	background-color: rgba(0,0,0, 0.4);
	z-index: 10;

	.modal-container {
		margin: auto;
		max-width: 420px;
		min-height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.modal-closing {
		align-self: flex-end;
		padding: 10px;
		color: var(--main-color);
		font-size: 30px;
		cursor: pointer;
	}
`;