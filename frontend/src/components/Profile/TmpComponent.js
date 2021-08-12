import {
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import Event from "../Events/Event";

function TmpComponent(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        <List>
          {props.events.map((event) => (
            <ListItem key={JSON.stringify(event)}>
              <Container>
                <Event info={event} />
              </Container>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TmpComponent;
