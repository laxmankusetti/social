import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const Message = ({ ownMessage, message }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.text && (
            <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>{message.text}</Text>
            <Box
              alignSelf={"flex-end"}
              ml={1}
              color={message.seen ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
          </Flex>
          )}
          {message.img && !imageLoaded &&(
            <Flex mt={5} w={'200px'}>
              <Image src={message.img} hidden onLoad={() => setImageLoaded(true)} alt="message image" borderRadius={'md'} />
              <Skeleton w={'200px'} h={'200px'} />
            </Flex>
          )}
          {message.img && imageLoaded &&(
            <Flex mt={5} w={'200px'}>
              <Image src={message.img} alt="message image" borderRadius={'md'} />
              <Box
              alignSelf={"flex-end"}
              ml={1}
              color={message.seen ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
            </Flex>
          )}
          <Avatar w={7} h={7} src={user.profilePic} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar w={7} h={7} src={selectedConversation.userProfilePic} />
          {message.text && (
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
          )}
          {message.img && !imageLoaded &&(
            <Flex mt={5} w={'200px'}>
              <Image src={message.img} hidden onLoad={() => setImageLoaded(true)} alt="message image" borderRadius={'md'} />
              <Skeleton w={'200px'} h={'200px'} />
            </Flex>
          )}
          {message.img && imageLoaded &&(
            <Flex mt={5} w={'200px'}>
              <Image src={message.img} alt="message image" borderRadius={'md'} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
