import React from "react";
import "./App.css";

import { ChatRoom } from "./Components/ChatRoom";
import { SignIn } from "./Components/SignIn";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Box, Center, Heading, Flex, ChakraProvider } from "@chakra-ui/react";



firebase.initializeApp({
  apiKey: "AIzaSyB5pC7bNcH0Eo-hKcLAVv4r0e0JkglfNLM",
  authDomain: "chat-with-react-and-firabase.firebaseapp.com",
  projectId: "chat-with-react-and-firabase",
  storageBucket: "chat-with-react-and-firabase.appspot.com",
  messagingSenderId: "267130515054",
  appId: "1:267130515054:web:8941b6eec223f99462007f",
  measurementId: "G-5ZQE9KEH09",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <ChakraProvider>
      <Flex
        className="App"
        width="100vw"
        height="100vh"
        p={10}
        direction="column"
        align="center"
        justifyContent="space-evenly"
       
      >
        

        <Flex>{user ? <ChatRoom firebase={firebase} /> : <SignIn firebase={firebase} />}</Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
