import React from "react";
import {Backdrop, Box, Button, Container, Fade, Modal, TextField} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {setModalOpen} from "../../actions/modal";
import {deleteEvent} from "../../actions/events";
import {useHistory, useParams} from "react-router-dom";

export const ButtonMR = styled(Button)({
  marginRight: "1rem"
});

export const DarkTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#f8f8ff",
  },
  "& .MuiFormLabel-filled": {
    color: "#f8f8ff",
  },
  "& .MuiInputLabel-outlined": {
    color: "grey",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#f8f8ff"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#f8f8ff"
  },
  // outlined text fields
  "& .MuiOutlinedInput-root": {
    color: "#f8f8ff",
    "& fieldset": {
      borderColor: "#f8f8ff"
    },
    "&:hover fieldset": {
      borderColor: "#f8f8ff"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f8f8ff"
    }
  },
  // tag color inverter
  "& .MuiInputLabel-animated": {
    color: "grey",
  },
})

const ModalContainer = styled(Container)({
  backgroundColor: "#36393f",
  color: "#f8f8ff",
  overflow: "hidden",
  height: "auto",
  marginTop: "2rem"
})

const ButtonGroup = styled(Box)({
  float: "right",
  marginBottom: "1rem"
})

const EditEventModal = (props) => {
  const {modal, setModalOpen, deleteEvent} = props;
  const {id} = useParams();
  const history = useHistory();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    ) && deleteEvent(id) &&
    setModalOpen(false)
    && history.push("/events")
  }

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
          <h2>{"Edit Event"}</h2>
          <p>react-transition-group animates me.</p>
          <ButtonGroup>
            <ButtonMR
              disableElevation
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handleDelete()}
            >
              {"Delete Event"}
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
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalOpen: (isOpen) => dispatch(setModalOpen(isOpen)),
    deleteEvent: (eventId) => deleteEvent(dispatch, eventId),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventModal)
