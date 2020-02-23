import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//MUI Stuff
import { Tooltip, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.spreadThis
});

class EditDetails extends Component {
  state = {
    name: "",
    bio: "",
    stocks: "",
    open: false
  };

  mapUserDetailsToState = (name, bio, stocks) => {
    this.setState({
      name: name ? name : "",
      bio: bio ? bio : "",
      stocks: stocks ? stocks : ""
    });
    console.log("Map User to State");
    console.log(name);
    console.log(bio);
    console.log(stocks);
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(
      this.props.name,
      this.props.bio,
      this.props.stocks
    );
    console.log("StateName");
    console.log(this.state.name);
    console.log("StateOpen");
    console.log(this.state.open);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      name: this.state.name,
      bio: this.state.bio,
      stocks: this.state.stocks
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  componentDidMount() {
    this.mapUserDetailsToState(
      this.props.name,
      this.props.bio,
      this.props.stocks
    );

    console.log("CompDidMount", this.props.name);
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Your investment Philosophy"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="name"
                type="text"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="stocks"
                type="text"
                label="Stocks"
                className={classes.textField}
                value={this.state.stocks}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
//   console.log(state.user),
//   console.log("test")
const mapActionsToProps = { editUserDetails };

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));
