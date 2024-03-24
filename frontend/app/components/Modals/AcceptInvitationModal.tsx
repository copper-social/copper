import { useDisclosure, Button, Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter } from "@chakra-ui/react";
import { Frown, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { InvitationService } from "~/services";
import Cookies from "js-cookie";
import SquareButton from "../UI/SquareButton";
import { Invitation } from "../UI/Invitation";

export function AcceptInvitationModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const [invites, setInvites] = useState<any>([]);
	const userId = Number(Cookies.get('userId'));

	useEffect(() => {
		InvitationService.getAllInvitations(userId, undefined).then((data): void => {
			console.log(data)
			setInvites(data);
		});
	}, []);

	return (
		<>
			<SquareButton
				w={14}
				h={14}
				onClick={onOpen }
			>
				<Users color='white' />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Pending Invitations</ModalHeader>
					<ModalCloseButton />
						<ModalBody pb={6}>
							<Box w='100%'>
								<Flex
									direction='column'
									maxH='calc(100vh - 4rem)'
									gap={3}
									px={4}
									pt={2}
									overflow='scroll'
									alignItems='center'
									css={{
										'&::-webkit-scrollbar': {
											width: '0rem',
										},
									}}
								>
									{invites.length === 0 ? 
										(
											<Flex h='400' alignItems='center'>
												<Flex alignItems='center' direction='column' gap={5}>
													<Frown color='white' size={80}/>
													<Text fontSize={16} textColor='white'>No invitations yet!</Text>
												</Flex>
											</Flex>
										) 
										: (invites.map((invitation: any, index: number) => (
										<Invitation key={index} community={invitation.communityName} avatarUrl={invitation.communityAvatar} accepted={invitation.accepted} declined={invitation.declined} date={invitation.createdAt} />
									)))}
								</Flex>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' onClick={onClose} colorScheme='blue' mr={3}>
								Close
							</Button>
						</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
