import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  ...theme.spreadThis,
  table: {
    minWidth: 50
  }
});

class StockList extends Component {
  render() {
    const { classes } = this.props;

    const createData = (name, price, change) => {
      return { name, price, change };
    };

    const rows = [
      createData("Microsoft", 159, "1.3%"),
      createData("Tesla", 237, "1.3%"),
      createData("Shopify", 262, "1.3%"),
      createData("Amazon", 305, "1.3%"),
      createData("Spotify", 356, "1.3%")
    ];

    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="large"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Change %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(StockList);
