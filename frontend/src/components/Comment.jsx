import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {

  return (
    <>
      <Flex my={4} w={'full'} py={2} gap={4}>
        <Avatar src={reply.userProfilePic} size={'sm'} name="Mark zukerberg" />
        <Flex gap={1} flexDirection={'column'} w={'full'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                <Text fontSize={'sm'} fontWeight={'bold'}>{reply.username}</Text>
                {/* <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'sm'} color={'gray.light'}>{reply.text}</Text>
                </Flex> */}
            </Flex>
            <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  )
}

export default Comment
