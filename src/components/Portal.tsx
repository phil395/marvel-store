import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	as: 'modal' | 'toast';
	children: ReactNode;
}

const Portal: FC<PortalProps> = ({ as, children }) => {
	return createPortal(
		<>{children}</>,
		document.getElementById(`${as === 'modal' ? 'modal' : 'toast'}`) as HTMLElement
	);
};

export default Portal;