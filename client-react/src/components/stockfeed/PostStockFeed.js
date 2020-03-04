import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import QuillEditor from "./QuillEditor";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postStockfeed, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "200vh"
  }
});

const onFilesChange = value => {
  console.log(value);
};

const onEditorChange = files => {
  console.log(files);
};

class PostStockFeed extends Component {
  state = {
    open: false,
    body: "",
    title: "",
    name: "",
    textBoxDisabled: false,
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.setState({ textBoxDisabled: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChangeTitle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeBody = event => {
    // this.setState({ [event.target.name]: event.target.value });
    this.setState({ body: event });
    console.log(event);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postStockfeed({
      body: this.state.body,
      title: this.state.title,
      likeCount: 0,
      commentCount: 0
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <TextField
          id="outlined"
          variant="outlined"
          label="Write a Post!"
          fullWidth
          onClick={this.handleOpen}
          disabled={this.state.textBoxDisabled}
        />
        {/* <MyButton onClick={this.handleOpen} tip="Post a Feed!">
          <AddIcon />
        </MyButton> */}
        <Dialog
          className={classes.dialogPaper}
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="m"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Feed</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="title"
                type="text"
                placeholder="Title"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChangeTitle}
                fullWidth
              />

              <hr className={classes.invisibleSeperator} />
              <QuillEditor
                name="body"
                placeholder={"Start Posting Something!"}
                onEditorChange={this.handleChangeBody}
                onFilesChange={onFilesChange}
              />
              {/* <TextField
                name="body"
                type="text"
                // label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Post a Note!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              /> */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostStockFeed.propTypes = {
  postStockfeed: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  users: state.users
});

export default connect(mapStateToProps, { postStockfeed, clearErrors })(
  withStyles(styles)(PostStockFeed)
);
