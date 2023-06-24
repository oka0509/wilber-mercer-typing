import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  timeLeft: number;
  level: number;
  errorCount: number;
};

const SuccessModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  timeLeft,
  level,
  errorCount,
}) => {
  console.log(timeLeft);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalBody>
          <p>かかった時間: {level * 60 - timeLeft}秒</p>
          <p>タイプミス: {errorCount}回</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            <a href="/">ホーム画面に戻る</a>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
