import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import RelativeTime from "react-relative-time";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//Redux
import { connect } from "react-redux";
import { likeStockfeed, unlikeStockfeed } from "../redux/actions/dataActions";

const styles = {
  card: {
    diplay: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

export class StockFeed extends Component {
  likedStockfeed = () => {
    console.log("Like Test");
    console.log(this.props.user.likes);
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like._id === this.props.stockfeed._id)
    )
      return true;
    else return false;
  };

  likeStockfeed = () => {
    this.props.likeStockfeed(this.props.stockfeed._id);
    console.log("like");
  };

  unlikeStockfeed = () => {
    this.props.unlikeStockfeed(this.props.stockfeed._id);
    console.log("unlike");
  };
  render() {
    const {
      classes,
      stockfeed: {
        _id,
        author,
        title,
        body,
        companyTags,
        likeCount,
        commentCount,
        url,
        urlToImage,
        date
      },
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton top="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedStockfeed() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeStockfeed}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeStockfeed}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return (
      <Card className={classes.card}>
        <CardMedia
          image="https://image.cnbcfm.com/api/v1/image/106071584-1565363694999gettyimages-951079756.jpeg"
          title="Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">{title}</Typography>
          <hr style={{ border: "none", margin: "0 0 10px 0" }} />
          <Typography variant="body2">{body}</Typography>

          <hr style={{ border: "none", margin: "0 0 10px 0" }} />

          <Typography
            variant="body1"
            component={Link}
            to={`/users/${author}`}
            color="primary"
          >
            {author}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            <RelativeTime value={date} />
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {_id}
          </Typography>

          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

StockFeed.propTypes = {
  likeStockfeed: PropTypes.func.isRequired,
  unlikeStockfeed: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  stockfeed: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeStockfeed,
  unlikeStockfeed
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StockFeed));
