import React from "react";
import { Link as RichLink } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Link,
  Spacer,
  Button,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useToast,
  MenuDivider,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/Auth/action";
const Links = [
  { src: "https://drive.google.com/file/d/1i-PUxDChV5Lmg2f680rxVmJ6yU82Fjml/view?usp=drive_link.img", path: "/" },
  {
    src: "https://drive.google.com/file/d/1y_ltJW7z-FyEXxVG11KwpW8lCJsHHsqp/view?usp=drive_link",
    path: "/transaction",
  },
  { src: "https://drive.google.com/file/d/1GcCFwe-Lctw1cnlwd9kxWgkUhyFJpso8/view?usp=drive_link", path: "/account" },
];
const NavLink = ({ path, src }) => (
  <Link
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={RichLink}
  >
    <img src={src} />
  </Link>
);

const Navbar = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logoutAPI());
    toast({
      title: "Logout Successfull",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box px={4} py={3} position={"sticky"} top={"1px"} border={"black 1px solid"}>
      <Flex alignItems="center" maxWidth="800px" mx={"auto"}>
        <Spacer />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.path} {...link} />
          ))}
        </HStack>
        <Spacer />

        {token ? (
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar
                size={"sm"}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_xtnZ-ylE50HqNDHSkokxByuAK01e04YjB2LtLE-1k6TbEYdPIRR2bOn"
                }
              />
            </MenuButton>
            <MenuList>
              <RichLink to="/profile">
                <MenuItem>Profile</MenuItem>
              </RichLink>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex>
            <RichLink to="/login">
              <Button colorScheme="blue" mr={2}>
                Login
              </Button>
            </RichLink>
            <RichLink to="/signup">
              <Button colorScheme="blue" w={"-webkit-fit-content"} variant="outline">
                Signup
              </Button>
            </RichLink>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
