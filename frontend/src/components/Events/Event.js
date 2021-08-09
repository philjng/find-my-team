import {useHistory} from "react-router-dom";
import { Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import {ItemContainer} from "../Groups/Group";

export const Typography1 = styled(Typography)({
  padding: "0.25rem",
});

function Event(props) {
  const { info } = props;
  const history = useHistory();
  const startDate = new Date(info.startTime).toUTCString();

  const handleClick = () => {
    history.push(`/events/${info._id}`)
  }

  return (
    <ItemContainer disableGutters={true} onClick={handleClick}>
      <Typography1 variant="h5" className="event_name">
        {info.title}
      </Typography1>
      <Typography1 variant="body1" className="event_location">
        Location: {info.location}
      </Typography1>
      <Typography1 variant="body2" className="event_date">
        Date: {startDate}
      </Typography1>
    </ItemContainer>
  );
}

export default Event;
