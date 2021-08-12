import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";
import { setModalOpen } from "../../actions/modal";
import { deleteEvent } from "../../actions/events";
import { deleteGroup } from "../../actions/groups";
import { useHistory, useParams } from "react-router-dom";

export const ButtonMR = styled(Button)({
  marginRight: "1rem",
});

const ModalContainer = styled(Container)({
  backgroundColor: "#36393f",
  color: "#f8f8ff",
  overflow: "hidden",
  height: "auto",
  marginTop: "2rem",
});

const ButtonGroup = styled(Box)({
  float: "right",
  marginBottom: "1rem",
});

const EditModal = (props) => {
  const { isEvent, modal, setModalOpen, deleteEvent, deleteGroup } = props;
  const { id } = useParams();
  const history = useHistory();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    try {
      isEvent
        ? window.confirm(
            "Are you sure you want to delete this event? This action cannot be undone."
          ) &&
          deleteEvent(id).then(() => {
            history.push("/events");
          })
        : window.confirm(
            "Are you sure you want to delete this group? This action cannot be undone."
          ) &&
          deleteGroup(id).then(() => {
            history.push("/groups");
          });
    } catch (error) {}
  };

  return (
    <Modal
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
        <ModalContainer>
          <h2>{isEvent ? "Edit Event" : "Edit Group"}</h2>
          <p>react-transition-group animates me.</p>
          <ButtonGroup>
            <ButtonMR
              disableElevation
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handleDelete()}
            >
              {isEvent ? "Delete Event" : " Delete Group"}
            </ButtonMR>
            <ButtonMR
              disableElevation
              size="small"
              variant="contained"
              color="primary"
            >
              Update
            </ButtonMR>
            <ButtonMR
              disableElevation
              size="small"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </ButtonMR>
          </ButtonGroup>
        </ModalContainer>
      </Fade>
    </Modal>
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
    deleteEvent: (eventId) => deleteEvent(dispatch, eventId),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
