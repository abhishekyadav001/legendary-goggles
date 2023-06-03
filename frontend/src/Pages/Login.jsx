import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Text,
  useToast,
  Image,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RichLink, useNavigate } from "react-router-dom";
import { loginAPI } from "../Redux/Auth/action";
import background from "../Assets/background.svg";
import logo from "../Assets/Logo.svg";
const initData = { email: "", password: "" };

const Login = () => {
  const { isLoading, token } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState(initData);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isErroremail = formData.email === "";
  const isErrorpass = formData.password === "";

  useEffect(() => {
    if (token) {
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/transaction");
      return;
    }
  }, [token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleForm = (e) => {
    e.preventDefault();
    dispatch(loginAPI(formData))
      .then((res) => {})
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack minH={"88vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack w={"100%"} h={"70%"}>
        <Box w={"100%"} h={"100%"}>
          <Image src={background} alt="backgroundimage" w={"100%"} h={"100%"} />
        </Box>
      </Stack>
      <VStack mx={"auto"} maxW={"lg"} p={6} position={"absolute"} top={"10em"}>
        <Box w={"auto"} display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
          <Image src={logo} w={"fit-content"} />
          <Heading color={"white"} fontSize={"xl"} pb={10} fontWeight={"light"}>
            Online Project Management
          </Heading>
        </Box>
        <Box rounded={"lg"} w={"100%"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={10}>
          <Heading textAlign={"center"} fontSize={"2xl"} pb={20} fontWeight={"normal"}>
            Login to Get started
          </Heading>
          <Stack w={{ base: "auto", md: "xs" }} as={"form"} onSubmit={handleForm} spacing={4}>
            <FormControl isRequired isInvalid={isErroremail}>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" onChange={handleInput} required={true} />
              {!isErroremail ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isErrorpass}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleInput} />
              {!isErrorpass ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            <Stack direction={{ base: "column", sm: "row" }} justify={"space-between"}>
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={"blue"} type="submit" isLoading={isLoading} loadingText="Loging in...">
              Login
            </Button>
          </Stack>
        </Box>
      </VStack>
    </VStack>
  );
};
export default Login;
