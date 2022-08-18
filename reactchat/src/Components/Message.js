import { Box, Flex, Image } from "@chakra-ui/react";

export const Message = ({ content, auth }) => {
  const messageType = content.uid === auth.currentUser.uid ? "sent" : "received";
   const photoUrl = content.photoURL
   console.log("photo url =")
   console.log(photoUrl)
   

  if (messageType == "sent") {
    return (
      <Flex m="2" justifyContent="flex-end">
        
        <Box
          width="fit-content"
          bg="gray.900"
          p="2"
          pl="4"
          pr="4"
          borderRadius="full"
        >
          {content.text}
        </Box>
        <Box m="1">
          <Image
            borderRadius="full"
            boxSize="40px"
            src={`${photoUrl}`}
          ></Image>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex m="2">
        <Box mr="1">
          <Image
            borderRadius="full"
            boxSize="40px"
            src={`${photoUrl}`}
          ></Image>
        </Box>
        <Box
          width="fit-content"
          bg="rgb(56,88,152)"
          p="2"
          pl="4"
          pr="4"
          borderRadius="full"
        >
          {content.text}
        </Box>
      </Flex>
    );
  }
};
