import { FC } from "react";
import { Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <Center w="full">
      <Button mx={2}>
        <Link to="/1">level1</Link>
      </Button>
      <Button mx={2}>
        <Link to="/2">level2</Link>
      </Button>
      <Button mx={2}>
        <Link to="/3">level3</Link>
      </Button>
    </Center>
  );
};

export default Home;
