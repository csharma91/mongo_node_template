import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import RelativeTime from "react-relative-time";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import StockfeedDialog from "./StockfeedDialog";
import LikeButton from "./LikeButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    // minWidth: 200,
    // objectFit: "cover",

    minWidth: 100,
    height: 100,
    objectFit: "cover",
    // maxWidth: "100%",
    // borderRadius: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  },
  posttypeimage: {
    maxWidth: 60,
    height: 40,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  },
  content: {
    objectFit: "cover"
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    textDecoration: "none",
    color: "black"
  },
  bodytext: {
    fontSize: 14
  },
  usertext: {
    fontSize: 12,
    fontWeight: "bold"
  },
  periodtext: {
    fontSize: 12,
    textAlign: "right",
    marginTop: -20,
    marginLeft: 600,
    position: "absolute"
  },
  bottomBar: {
    fontsize: 12
  }
});
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied"
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied"
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral"
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied"
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied"
  }
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

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
        sentimentType,
        postTypeImage
      },
      user: { authenticated }
    } = this.props;

    const likeCount = likes.length;
    const commentCount = comments.length;

    return (
      <Card className={classes.card}>
        <div>
          <CardMedia
            image={avatar}
            title="Profile Pic"
            className={classes.image}
          />
          <hr className={classes.invisibleSeperator} />
          <img
            src={postTypeImage}
            className={classes.posttypeimage}
            alt="Logo"
          />
        </div>

        <CardContent className={classes.content}>
          <Typography variant="body2" className={classes.usertext}>
            {author}
          </Typography>
          <Typography
            variant="body2"
            className={classes.periodtext}
            color="textSecondary"
          >
            <RelativeTime value={date} />
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <a className={classes.title} href={url} target="_blank">
            {companyTags} {" : "} {title}
          </a>
          <hr style={{ border: "none", margin: "0 0 5px 0" }} />
          <Typography variant="body2" className={classes.bodytext}>
            {this.testFunc(body)}
          </Typography>
          <hr style={{ border: "none", margin: "0 0 5px 0" }} />

          <span className={classes.bottomBar}>{sentimentType}</span>
          {/* <LikeButton stockfeedId={_id} />
            <span className={classes.bottomBar}>{likeCount} Likes</span> */}
          <MyButton tip="Rating">
            <Rating
              name="customized-icons"
              defaultValue={3}
              getLabelText={value => customIcons[value].label}
              IconContainerComponent={IconContainer}
            />
          </MyButton>
          {/* <span className={classes.bottomBar}>Score {commentCount} </span> */}

          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span className={classes.bottomBar}>{commentCount} Comments</span>

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
