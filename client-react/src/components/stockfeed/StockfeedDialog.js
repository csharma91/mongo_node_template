import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";

// Redux stuff
import { connect } from "react-redux";
import { getStockfeed, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  mainImage: {
    maxWidth: 1000,
    height: 250,
    objectFit: "cover",
    display: "block",
    position: "relative",
    margin: "0 auto"
  },
  dialogContent: { display: "inline" },
  dialogTitle: { display: "inline" },
  dialogDate: {
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  }
});
class StockfeedDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };

  handleOpen = () => {
    this.props.getStockfeed(this.props.id);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      stockfeed: {
        id,
        author,
        title,
        body,
        articleImage,
        companyTags,
        likes,
        comments,
        url,
        avatar,
        date,
        sentimentType
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid>
        <Grid item sm={10}>
          <img
            src={articleImage}
            alt="Main Image"
            className={classes.mainImage}
          />
          <hr className={classes.invisibleSeperator} />
          <div className={classes.dialogTitle}>
            <h3>{title}</h3>
          </div>

          <div className={classes.dialogDate}>
            {dayjs(date).format("h:mm a, MMMM, DD YYYY")}
          </div>
          <hr className={classes.invisibleSeperator} />
          <div className={classes.dialogContent}>{body}</div>
          <hr className={classes.invisibleSeperator} />

          {/* <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/user/${author}`}
            className={classes.dialogTitle}
          >
            {title}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.dialogDate}
          >
            {dayjs(date).format("h:mm a, MMMM, DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2" className={classes.dialogContent}>
            {body}
          </Typography> */}
        </Grid>

        <hr className={classes.visibleSeperator} />
        <CommentForm stockfeedId={this.props.id} />
        <Comments comments={comments} />

        {/* {{ comments }.length > 0 ? (
          <Comments comments={comments} />
        ) : (
          <div>
            <p>{"Helllo!!!!"}</p>
          </div>
        )} */}
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Stockfeed"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

StockfeedDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getStockfeed: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  stockfeed: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  stockfeed: state.data.stockfeed
});

const mapActionToProps = {
  getStockfeed,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(StockfeedDialog));
