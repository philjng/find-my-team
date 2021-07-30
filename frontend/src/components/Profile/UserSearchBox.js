import {Container, List, ListItem, Divider, Typography} from "@material-ui/core";
import React from "react";
import UserListing from "./UserListing";
function UserSearchBox(props) {
    return (
        <Container>
                    <Typography variant="h5">People</Typography>
                    <List>
                    {props.userSearchResults.map((user) => (
                        <React.Fragment key={user._id}>
                        <ListItem>
                          <UserListing user={user}/>
                        </ListItem>
                        <Divider variant="middle" component="li" />
                      </React.Fragment>
                    ))}
                    </List>
            </Container>
        )

}
export default UserSearchBox;