import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import RelativeTime from "react-relative-time";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import StockfeedDialog from "./StockfeedDialog";
import LikeButton from "./LikeButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: "cover"

    // width: 75,
    // height: 75,
    // objectFit: "cover",
    // maxWidth: "100%",
    // borderRadius: "50%"
  },
  content: {
    objectFit: "cover"
  },
  title: {
    fontSize: 20,
    marginTop: 10
  },
  bodytext: {
    fontSize: 12
  },
  usertext: {
    fontSize: 12,
    fontWeight: "bold"
  },
  periodtext: {
    fontSize: 12,
    textAlign: "right",
    marginTop: -20
  }
};

export class StockFeed extends Component {
  testFunc = body => {
    return body.replace(/^(.{200}[^\s]*).*/, "$1") + " ....";
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
        likes,
        comments,
        url,
        avatar,
        date,
        sentimentType
      },
      user: { authenticated }
    } = this.props;

    const likeCount = likes.length;
    const commentCount = comments.length;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={avatar}
          title="Profile Pic"
          className={classes.image}
        />

        <CardContent className={classes.content}>
          <div>
            <Typography variant="body2" className={classes.usertext}>
              {author}
            </Typography>
          </div>
          <Typography
            variant="body2"
            className={classes.periodtext}
            color="textSecondary"
          >
            <RelativeTime value={date} />
          </Typography>
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
          <hr style={{ border: "none", margin: "0 0 10px 0" }} />
          <Typography variant="body2" className={classes.bodytext}>
            {this.testFunc(body)}
          </Typography>

          <hr style={{ border: "none", margin: "0 0 10px 0" }} />

          <Typography
            variant="body1"
            component={Link}
            to={`/users/${author}`}
            color="primary"
          >
            {sentimentType}
          </Typography>

          <LikeButton stockfeedId={_id} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <StockfeedDialog id={_id} author={author} />
        </CardContent>
      </Card>
    );
  }
}

StockFeed.propTypes = {
  user: PropTypes.object.isRequired,
  stockfeed: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(StockFeed));
