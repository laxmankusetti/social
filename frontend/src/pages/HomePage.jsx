import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast"
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";


const HomePage = () => {

  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();

        if(data.error){
          showToast('Error', data.error, 'error');
          return
        }
        setPosts(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    getFeedPosts()
  }, [showToast, setPosts]);

  return (
    <Flex gap={10} alignItems={'flex-start'}>
      <Box flex={70}>
      {loading && (
        <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
        </Flex>
      )}

      {!loading && posts.length === 0 && (
        <h1 style={{fontWeight:'600'}}>Follow some users to get posts!</h1>
      )}

      {posts.map(post => (
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
      </Box>
      <Box flex={30} display={{
        base:'none',
        md:'block'
      }}>
        <SuggestedUsers />
      </Box>
    </Flex>
  )
}

export default HomePage
