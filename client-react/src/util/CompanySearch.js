import fetch from "cross-fetch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import React from "react";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// For multiple Entries
//https://codesandbox.io/s/material-demo-tfpo4

export default function CompanySearch() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [data, setData] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://rocky-brook-15018.herokuapp.com/api/v2/compSearch?q="
      );
      await sleep(1e1); // For demo purposes.
      const result = await response.json();
      const compList = result.result;

      if (active) {
        setOptions(Object.keys(compList).map(key => compList[key]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  console.log(data);

  return (
    <Autocomplete
      id="asynchronous-demo"
      multiple
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.symbol === value.symbol}
      getOptionLabel={option => option.symbol}
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        setData(newValue);
      }}
      renderOption={option => (
        <React.Fragment>
          {option.symbol}
          <br />

          {option.name}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Select Company"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
