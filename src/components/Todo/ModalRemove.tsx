import { Modal, TextContainer } from "@shopify/polaris";
import { observer } from "mobx-react";
import React from "react";
type TProp = {
  action: () => void;
  open: boolean;
  loading: boolean;
  toggleOpen: () => void;
};
const ModalRemove: React.FC<TProp> = observer(
  ({ action, open, toggleOpen, loading }) => {
    return (
      <Modal
        open={open}
        onClose={toggleOpen}
        title="Delete"
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: action,
          loading,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>Bạn có chắc chắn muốn xóa?</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    );
  }
);
export default ModalRemove;
