import React, { useRef, useState } from "react";
import { Box, Button, Flex, Input, Image, FormControl } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { BsFillEmojiLaughingFill, BsChatRightTextFill } from "react-icons/bs";
import { RiWechatLine } from "react-icons/ri"
import { Message } from "./Message";

export const ChatRoom = ({ firebase }) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log("messages = ");
  console.log(messages);
  if (messages != undefined) {
    messages.map((msg) => {
      console.log("msg = ");
      console.log(msg.uid);
    });
  }

  const signOut = () => {
    auth.signOut();
  };

  const [formValue, setFormValue] = useState("");
  const skrol = useRef()
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    skrol.current.scrollIntoView({ behavior: 'smooth'})

    setFormValue("");
  };

  

  return (
    <Flex height="90vh" width="100vw">
      <Box
        borderRadius="sm"
        h="full"
        w="full"
        ml="10"
        mr="10"
        bg="gray.700"
        justifyContent="space-between"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          bg="gray.900"
          borderRadius="sm"
          h="10vh"
        >
          <Box m="5">
            <BsChatRightTextFill fontSize={30} color="rgb(56,88,152)" />
          </Box>
          <Button m="3" colorScheme="pink" onClick={signOut}>
            Sign Out
          </Button>
        </Flex>
        <Flex h="70vh" color="white" m="3" direction="column" overflow="auto" className="chat">
          {messages &&
            messages.map((msg) => (
              <Message key={msg.uid} content={msg} auth={auth}></Message>
            ))}
            <Box ref={skrol}></Box>
        </Flex>
        <Flex
          h="10vh"
          direction="row"
          bg="gray.900"
          borderRadius="sm"
          justifyContent="space-evenly"
          alignItems="center"
          
        >
          <form onSubmit={sendMessage}>
            <Flex>
              <Box color="white" w="60vw" m="2">
                <Input
                  placeholder="Write a message"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                ></Input>
              </Box>
              <Box color="white" w="10vw" mt="2" mr="2">
                <Button colorScheme="facebook" type="submit">
                  Send
                </Button>
              </Box>
            </Flex>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
};
