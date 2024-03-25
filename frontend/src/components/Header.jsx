import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from 'react-icons/fi';

import { Link as RouterLink } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from 'react-icons/md';

const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justify={"space-between"} mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link as={RouterLink} onClick={() => {
          setAuthScreen('login')
        }} to='/auth'>
        Login
        </Link>
      )}
      <Image
        src={colorMode === "dark" ? "/light.logo.svg" : "/dark.logo.svg"}
        alt="logo"
        onClick={toggleColorMode}
        cursor={"pointer"}
        w={6}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={24} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={24} />
          </Link>
          <Button size={"xs"} onClick={logout}><FiLogOut/></Button>
        </Flex>
      )}
      {!user && (
        <Link as={RouterLink} onClick={() => {
          setAuthScreen('signup')
        }} to={'/auth'}>
        SignUp
        </Link>
      )}
    </Flex>
  );
};

export default Header;
