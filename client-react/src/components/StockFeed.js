import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import RelativeTime from "react-relative-time";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  render() {
    const {
      classes,
      stockfeed: {
        author,
        title,
        body,
        companyTags,
        likeCount,
        commentCount,
        url,
        urlToImage,
        date
      }
    } = this.props;

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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(StockFeed);
