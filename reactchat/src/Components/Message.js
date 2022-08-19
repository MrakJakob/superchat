import { Box, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";

export const Message = ({ content, auth }) => {
  const messageType =
    content.uid === auth.currentUser.uid ? "sent" : "received";
  const photoUrl = content.photoURL;
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState("")
 
  // console.log(content)
  const showDetails = (e) => {
    // console.log(content.createdAt.seconds)
    var x = new Date(content.createdAt.seconds * 1000)
    setTime(x.toISOString()
    .substring(11, 16));
    // if user clicks on a certain message, the ui shows time of the sent message
    setIsActive(!isActive);
  };

  if (messageType == "sent") {
    return (
      <Flex m="2" onClick={showDetails} direction="column">
        <Flex justifyContent="flex-end">
          <Box
            width="fit-content"
            bg={isActive ? "black" : "gray.900"}
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
        {isActive && (
          <Flex mr="12" justifyContent="flex-end">
            <Box color="gray">{time}</Box>{" "}
          </Flex>
        )}
      </Flex>
    );
  } else {
    return (
      <Flex m="2" onClick={showDetails} direction="column">
        <Flex>
          <Box mr="1">
            <Image
              borderRadius="full"
              boxSize="40px"
              src={`${photoUrl}`}
            ></Image>
          </Box>
          <Box
            width="fit-content"
            bg={isActive ? "rgb(38, 59, 102)" : "rgb(56,88,152)"}
            p="2"
            pl="4"
            pr="4"
            borderRadius="full"
          >
            {content.text}
          </Box>
        </Flex>
        {isActive && (
          <Flex ml="12">
            <Box color="gray">{time}</Box>
          </Flex>
        )}
      </Flex>
    );
  }
};
