export default {
  palette: {
    primary: {
      light: "#7986cb",
      main: "#212121",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#9e9e9e",
      dark: "#c51162",
      contrastText: "#fff"
    }
  },
  spreadThis: {
    typography: {
      useNextVarients: true
    },
    form: {
      textAlign: "center"
    },
    image: {
      maxWidth: 75,
      margin: "20px auto 20px auto"
    },
    pageTitle: {
      margin: "10px auto 10px auto"
    },
    textfield: {
      margin: "10px auto 10px auto"
    },
    button: {
      margin: "20px auto 20px auto"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10
    },
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "black"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    },
    invisibleSeperator: {
      border: "none",
      margin: 10
    },
    visibleSeperator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    }
  }
};
