import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {clearSnackbar} from "../../actions/snackbar";

const SnackbarContainer = (props) => {
  // Snackbar State
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState("info")
  const [message, setMessage] = useState("")
  const { snackbar, clearSnackbar } = props

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    clearSnackbar()
    setOpen(false)
  }

  useEffect(() => {
    if (snackbar.message !== "") {
      setOpen(true);
      setMessage(snackbar.message);
      setSeverity(snackbar.severity);
    }
  }, [snackbar])

  return (
    <Snackbar onClose={handleClose} open={open} autoHideDuration={3000} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}>
      <MuiAlert onClose={handleClose} severity={severity} variant="filled">
        {message}
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