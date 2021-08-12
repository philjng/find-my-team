import React, {useState} from "react";
import {Backdrop, Box, Container, Fade, Grid, Modal} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {connect} from "react-redux";
import {setModalOpen} from "../../actions/modal";
import {deleteGroup} from "../../actions/groups";
import {useHistory, useParams} from "react-router-dom";
import {ButtonMR, DarkTextField} from "../Events/EditEventModal";
import {AddTagButton, ProfileTags} from "../Profile/UserInfo";

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

const EditGroupModal = (props) => {
  const {modal, setModalOpen, deleteGroup} = props;
  const {id} = useParams();
  const history = useHistory();

  const [description, setDescription] = useState(props.description);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(props.tags);

  const addTag = (newTag) => {
    newTag.trim() !== "" && setTags(tags.concat([newTag.trim()]))
    setTag("");
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    window.confirm(
      "Are you sure you want to delete this group? This action cannot be undone."
    ) &&
    deleteGroup(id) &&
      setModalOpen(false) &&
    history.push("/groups");
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
          <h2>{"Edit Group"}</h2>
          <Grid item container direction="column" spacing="2">
            <Grid item>
              <DarkTextField
                variant="outlined"
                label="Group Description"
                value={description}
                multiline
                fullWidth
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="left"
                alignItems="left"
              >
                <Grid item>
                  <DarkTextField
                    onChange={(e) => setTag(e.target.value)}
                    id="outlined-basic"
                    label="Tag"
                    size="small"
                    value={tag}
                  />
                  <AddTagButton
                    variant="contained"
                    onClick={() => {addTag(tag)}}
                  >
                    Add
                  </AddTagButton>
                  <Box>
                    {tags.map((item) => (
                      <ProfileTags label={item} onDelete={() => handleDeleteTag(item)} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ButtonGroup>
            <ButtonMR
              disableElevation
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handleDelete()}
            >
              {" Delete Group"}
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
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupModal)
