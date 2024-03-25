import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from 'date-fns';
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";

const Post = ({ post, postedBy }) => {

  const [user, setUser] = useState(null);
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      if(!window.confirm('Are you sure want to delete this post?')) return
      const res = await fetch(`/api/posts/${post._id}`, {
        method:'DELETE'
      });

      const data = await res.json();

      if(data.error){
        showToast('Error', data.error, 'error')
        return
      }

      showToast('Success', 'Post deleted successfully!', 'success');
      setPosts(posts.filter(p => p._id !== post._id))

    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} m={4} pb={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            name={user?.name}
            size={"md"}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w={1} h={"full"} my={2} bg={"gray.light"}></Box>
          <Box w={"full"} position={"relative"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name="dummt1"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="dummt1"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="dummt1"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} w={"full"}>
              <Text
                fontWeight={"bold"}
                fontSize={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image w={4} h={4} ml={1} src="/verified.png" />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"xs"} color={"gray.light"} textAlign={'right'} w={36}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image w={"full"} src={post.img} />
          </Box>
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
          {/* <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {post.likes.length} Likes
            </Text>
            <Box w={0.5} h={0.5} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {post.replies.length} Replies
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
