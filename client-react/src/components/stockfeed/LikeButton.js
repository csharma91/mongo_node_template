import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//Redux
import { connect } from "react-redux";
import {
  likeStockfeed,
  unlikeStockfeed
} from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedStockfeed = () => {
    console.log("Like Test");
    // if (
    //   this.props.user.likes &&
    //   this.props.user.likes.find(like => like.id === this.props.stockfeedId)
    // )
    if (1 === 1) return true;
    else return false;
  };

  likeStockfeed = () => {
    this.props.likeStockfeed(this.props.stockfeedId);
    console.log("like");
  };

  unlikeStockfeed = () => {
    this.props.unlikeStockfeed(this.props.stockfeedId);
    console.log("unlike");
  };

  render() {
    const { authenticated } = this.props.user;

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
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeStockfeed: PropTypes.func.isRequired,
  unlikeStockfeed: PropTypes.func.isRequired,
  stockfeedId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeStockfeed,
  unlikeStockfeed
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
