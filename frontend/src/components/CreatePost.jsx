import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;

const CreatePost = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaingChar, setRemainingChar] = useState(MAX_CHAR);
  const imageRef = useRef(null);
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { username } = useParams;

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Post created successfully", "success");
      if(username === user.username){
        setPosts([data, ...posts])
      }
      setPostText("");
      setImgUrl("");
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        right={10}
        bottom={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here..."
                value={postText}
                onChange={handleTextChange}
              />

              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"gray.600"}
                textAlign={"right"}
                m={1}
              >
                {remaingChar}/{MAX_CHAR}
              </Text>

              <Input
                type="file"
                ref={imageRef}
                hidden
                onChange={handleImageChange}
              />
              <BsFillImageFill
                onClick={() => imageRef.current.click()}
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
              />

              {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                  <Image src={imgUrl} alt="selected image" />
                  <CloseButton
                    position={"absolute"}
                    top={2}
                    right={2}
                    bg={"gray.800"}
                    onClick={() => setImgUrl("")}
                  />
                </Flex>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
              size={{
                base:'sm',
                sm:'md'
              }}
            >
              Create Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
