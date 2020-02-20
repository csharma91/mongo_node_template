import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import StockFeed from "../StockFeed";

export class home extends Component {
  state = {
    stockfeeds: null
  };
  componentDidMount() {
    axios
      .get("/api/stockfeed/all")
      .then(res => {
        console.log(res.data);
        this.setState({
          stockfeeds: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentContactMarkUp = this.state.stockfeeds ? (
      this.state.stockfeeds.map(stockfeed => (
        <StockFeed key={stockfeed.title} stockfeed={stockfeed} />
      ))
    ) : (
      <p>Loading....</p>
    );
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentContactMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile....</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
