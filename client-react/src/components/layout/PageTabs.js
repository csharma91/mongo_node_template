import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import withStyles from "@material-ui/core/styles/withStyles";
import ForumIcon from "@material-ui/icons/Forum";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import WarningIcon from "@material-ui/icons/Warning";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  bigIndicator: {
    height: "10px"
  }
});

function PageTabs() {
  const classes = styles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" key="appbar">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          indicatorClassName={classes.bigIndicator}
        >
          <Tab label="StokTok" icon={<ForumIcon />} {...a11yProps(0)} />
          <Tab label="News Feed" icon={<DynamicFeedIcon />} {...a11yProps(1)} />
          <Tab label="Alt Data" icon={<DataUsageIcon />} {...a11yProps(2)} />
          <Tab label="Alerts" icon={<WarningIcon />} {...a11yProps(3)} />
          <Tab label="People" icon={<PersonPinIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        StockTok
      </TabPanel>
      <TabPanel value={value} index={1}>
        News Feed
      </TabPanel>
      <TabPanel value={value} index={2}>
        Alt Data
      </TabPanel>
      <TabPanel value={value} index={3}>
        Alert
      </TabPanel>
      <TabPanel value={value} index={4}>
        People
      </TabPanel>
    </div>
  );
}

export default withStyles(styles)(PageTabs);
