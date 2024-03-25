import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { Link as RouterLink } from 'react-router-dom';

import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {

  const currentUser = useRecoilValue(userAtom);

  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  const toast = useToast();

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        description: "URL copied to clipboard!",
        status: "success",
        title: "Copied",
        duration: 3000,
      });
    });
  };

  return (
    <VStack alignItems={"start"} gap={4}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              color={"gray.light"}
              bg={"gray.dark"}
              borderRadius={"full"}
              p={1}
            >
              threads.light
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
            name={user.name}
            src={user.profilePic}
            size={{ base: "md", md: "xl" }}
          />
          )}

          {!user.profilePic && (
            <Avatar
            name={user.name}
            src='https://bit.ly/broken-link'
            size={{ base: "md", md: "xl" }}
          />
          )}

        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={'sm'}>Update Profile</Button>
        </Link>
      )}

      {currentUser?._id !== user._id && (
        <Button size={'sm'} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? 'Unfollow' : 'Follow'}
        </Button>
      )}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={2}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          cursor={"pointer"}
          pb={3}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          cursor={"pointer"}
          pb={3}
          color={"gray.light"}
          fontWeight={"bold"}
        >
          <Text fontWeight={"bold"}> Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
