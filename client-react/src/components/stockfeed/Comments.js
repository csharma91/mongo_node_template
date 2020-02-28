import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: "90%",
    height: 90,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 30
  },
  commentText: {
    fontSize: 16
  },
  commentDate: {
    fontSize: 12
  },
  commentAuthor: {
    fontsize: 16,
    fontWeight: "bold"
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { text, urlToImage, user, date, author } = comment;
          return (
            <Fragment key={index}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={urlToImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="body2"
                        className={classes.commentAuthor}
                      >
                        {author}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={classes.commentDate}
                        color="textSecondary"
                      >
                        {dayjs(date).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />
                      <Typography
                        variant="body1"
                        className={classes.commentText}
                      >
                        {text}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeperator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
