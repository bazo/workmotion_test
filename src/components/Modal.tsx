import { Button, Modal as BaseModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	body: ReactNode;
	buttons?: ReactNode[];
}

const Modal: VFC<ModalProps> = ({ isOpen, onClose, body, buttons = [] }) => {
	return (
		<BaseModal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{body}</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
					{buttons}
				</ModalFooter>
			</ModalContent>
		</BaseModal>
	);
};

export default Modal;
