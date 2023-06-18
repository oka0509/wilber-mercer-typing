import { FC } from "react";
import { Center, Button } from "@chakra-ui/react";

const Home: FC = () => {
  return (
    <Center w="full">
      <Button mx={2}>
        <a href="/1">level1</a>
      </Button>
      <Button mx={2}>
        <a href="/2">level2</a>
      </Button>
      <Button mx={2}>
        <a href="/3">level3</a>
      </Button>
    </Center>
  );
};

export default Home;
