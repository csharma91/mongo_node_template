import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import StockFeed from "../components/stockfeed/StockFeed";
import Profile from "../components/profile/Profile";
import StockList from "../components/stockfeed/StockList";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux Stuff
import { connect } from "react-redux";
import { getStockfeeds } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

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
      <CircularProgress size={200} />
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentContactMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          {/* <p>Profile....</p> */}
          <Profile />
          <hr style={{ border: "none", margin: "0 0 20px 0" }} />
          <Typography variant="h6" align="center">
            {"Your Stock List"}
          </Typography>
          <hr style={{ border: "none", margin: "0 0 10px 0" }} />
          <StockList />

          <hr style={{ border: "none", margin: "0 0 20px 0" }} />
          <Typography variant="h6" align="center">
            {"Your News"}
          </Typography>
          <hr style={{ border: "none", margin: "0 0 10px 0" }} />
          <StockList />

          <hr style={{ border: "none", margin: "0 0 20px 0" }} />
          <Typography variant="h6" align="center">
            {"People"}
          </Typography>
          <hr style={{ border: "none", margin: "0 0 10px 0" }} />
          <StockList />
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
export default connect(mapStateToProps, { getStockfeeds })(
  withStyles(styles)(home)
);
