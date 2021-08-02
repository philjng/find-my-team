import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import {connect} from "react-redux";
import {clearSnackbar} from "../../actions/snackbar";

const SnackbarContainer = (props) => {
  const { snackbar, clearSnackbar } = props

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    clearSnackbar()
  }

  return (
    <Snackbar onClose={handleClose} open={snackbar.isOpen} autoHideDuration={3000} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}>
      <MuiAlert onClose={handleClose} severity={snackbar.severity} variant="filled">
        {snackbar.message}
      </MuiAlert>
    </Snackbar>
  )
}

const mapStateToProps = (state) => ({
  snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch) => {
  return {
    clearSnackbar: () => dispatch(clearSnackbar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer)