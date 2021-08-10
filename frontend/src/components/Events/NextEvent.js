import { Card, CardContent, CardHeader, CardMedia } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import Event from "./Event";

const SCCard = styled(Card)({
  backgroundColor: `#f7fdfc`,
});

function NextEvent(props) {
  const { event } = props;

  return (
    <SCCard>
      <CardHeader title="Up Next" />
      {event ? (
        <>
          <CardMedia image={event.image} />
          <CardContent>
            <Event info={event} />
          </CardContent>
        </>
      ) : (
        <CardContent>You have no upcoming events.</CardContent>
      )}
    </SCCard>
  );
}

export default NextEvent;
