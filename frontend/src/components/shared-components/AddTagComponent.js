import {Box, Button, Grid, TextField, Typography} from "@material-ui/core";

const AddTagComponent = () => {
  return (
    <Box>
      <Typography variant="h6">Tags</Typography>
        <Grid
          container
          direction="column"
          justifyContent="left"
          alignItems="left"
        >
          <Grid item>
            <TextField
              onChange={handleTagsInputTextChange}
              id="outlined-basic"
              label="Tag"
              size="small"
              value={form.tagsInputText}
            />
            <Button
              variant="contained"
              onClick={() => addTag(form.tagsInputText)}
            >
              Add
            </Button>
          </Grid>
        </Grid>
    </Box>
  )
}