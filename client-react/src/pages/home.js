import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";

import StockFeed from "../components/StockFeed";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getStockfeeds } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getStockfeeds();
  }
  render() {
    const { stockfeeds, loading } = this.props.data;
    let recentContactMarkUp = !loading ? (
      stockfeeds.map(stockfeed => (
        <StockFeed key={stockfeed.title} stockfeed={stockfeed} />
      ))
    ) : (
      <p>Loading....</p>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentContactMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          {/* <p>Profile....</p> */}
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getStockfeeds: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(mapStateToProps, { getStockfeeds })(home);
