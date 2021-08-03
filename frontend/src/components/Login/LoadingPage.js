import { CircularProgress, Grid, Typography } from "@material-ui/core";

function LoadingPage(props) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography color="primary">{props.value}</Typography>
      <CircularProgress color="primary" size={100} />
    </Grid>
  );
}
export default LoadingPage;
