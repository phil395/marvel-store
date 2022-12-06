export const toggleActivityClass = (newNode: HTMLElement, prevNode: HTMLElement | undefined) => {
	if (prevNode) prevNode.classList.remove('active-item');
	newNode.classList.add('active-item');
};