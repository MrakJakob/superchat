import { ChakraProvider, Button, Stack } from "@chakra-ui/react";
import "firebase/auth";
import { firebase } from "firebase/app";
import "firebase/firestore";

export const SignIn = ({ firebase }) => {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button colorScheme="teal" size="lg" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );

  // sign out 3:26
};
