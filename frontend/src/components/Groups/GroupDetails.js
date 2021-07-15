import {connect} from 'react-redux';
import {Avatar, Box, Card, CardContent, CardMedia, Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

export const FlexBox = styled(Box)({
    display: `flex`,
})

export const VerticalContent = styled(CardContent)({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`
})

const GroupPage = styled(Container)({
    backgroundColor: `#f7fdfc`,
})

const GroupCard = styled(Card)({
    backgroundColor: `#ebfaf7`,
    margin: `1rem`,
})

const GroupContent = styled(CardContent)({
    display: `flex`,
    justifyContent: `space-between`
})

const LeftBox = styled(Box)({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`
})

const Image = styled(CardMedia)({
    width: `50%`
})

const SecondBox = styled(FlexBox)({
    justifyContent: `space-between`,
    margin: `1rem`,
})

const EventCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    flexGrow: `2`,
    marginRight: `1rem`
})

const MembersCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
})

const Member = styled(FlexBox)({
    margin: `0.5rem 0`,
})

const Name = styled(Typography)({
    marginLeft: `0.5rem`,
    marginTop: `0.5rem`,
    verticalAlign: `center`
})

function GroupDetails(props) {
    return (
        <GroupPage>
            <GroupCard>
                <GroupContent>
                    <LeftBox>
                        <Box>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">
                                    {props.group.name}
                                </Box>
                            </Typography>
                            <Typography>
                                <Box fontWeight="fontWeightLight">{"Created by " + props.group.author}</Box>
                                <Box fontWeight="fontWeightLight">{props.group.groupSize + " members"}</Box>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Group Description</Typography>
                            {props.group.description}
                        </Box>
                        <Box>
                            <Typography variant="h6">Tags</Typography>
                            <Typography>
                                {props.group.tags.join(", ")}
                            </Typography>
                        </Box>
                    </LeftBox>
                    {/*TODO: images for group*/}
                    <Image>
                        <img
                            src="https://i.ytimg.com/vi/NVuL7mLqT6g/maxresdefault.jpg"
                            alt="stock image"
                            style={{
                                width: "100%",
                                height: "auto"
                            }}
                        />
                    </Image>
                </GroupContent>
            </GroupCard>
            <SecondBox>
                <EventCard>
                    <VerticalContent>
                        <Typography variant="h6">Events</Typography>
                        {/*TODO: set up group related events listing*/}
                        <Typography align="center">This group has no events.</Typography>
                    </VerticalContent>
                </EventCard>
                <MembersCard>
                    <VerticalContent>
                        <Typography variant="h6">{"Members (" + props.group.groupSize + ")"}</Typography>
                        {/*TODO: set up user names and icons*/}
                        {props.group.memberIds.map((id) => (
                            <Member>
                                <Avatar/>
                                <Name align="center">No Name</Name>
                            </Member>
                        ))}
                    </VerticalContent>
                </MembersCard>
            </SecondBox>
        </GroupPage>
    )
}

const mapStateToProps = (state) => {
    return {
        group: state.groups.group
    }
}

export default connect(mapStateToProps)(GroupDetails);