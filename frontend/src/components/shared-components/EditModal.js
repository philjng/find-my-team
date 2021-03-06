import React from "react";
import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import { setModalOpen } from "../../actions/modal";
import CreateGroupPage from "../Groups/CreateGroup";
import Create from "../Events/CreateEvents";

export const ButtonMR = styled(Button)({
  marginRight: "1rem",
});

export const SCModal = styled(Modal)({
  height: "700px",
  overflow: "scroll"
});

const EditModal = (props) => {
  const { modal, setModalOpen, isEvent } = props;

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <SCModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modal.isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modal.isOpen}>
        {isEvent ? (
          <Create isEditMode={true} event={props.event} />
        ) : (
          <CreateGroupPage isEditMode={true} group={props.group} />
        )}
      </Fade>
    </SCModal>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
