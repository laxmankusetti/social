import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({postImg, postTitle, likes, replies}) => {
    const [liked, setLiked] = useState(false);
  return (
    <Link to={"/markzukerberg/post/1"}>
      <Flex gap={3} m={4} pb={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar name="Mark zukerberg" size={"md"} src="/zuck-avatar.png" />
          <Box w={1} h={"full"} my={2} bg={"gray.light"}></Box>
          <Box w={"full"} position={"relative"}>
            <Avatar
              size={"xs"}
              name="dummt1"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="dummt1"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="dummt1"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} w={"full"}>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                markzukerberg
              </Text>
              <Image w={4} h={4} ml={1} src="/verified.png" />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image w={'full'} src={postImg} />
          </Box>
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex alignItems={'center'} gap={2}>
            <Text fontSize={'sm'} color={'gray.light'}>{likes} Likes</Text>
            <Box w={0.5} h={0.5} bg={'gray.light'}></Box>
            <Text fontSize={'sm'} color={'gray.light'}>{replies} Replies</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
