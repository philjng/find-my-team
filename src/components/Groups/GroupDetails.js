import {connect} from 'react-redux';
import {Box, Card, CardContent, CardMedia, Container, Typography} from "@material-ui/core";
import {styled} from "@material-ui/styles";

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

const GroupDescription = styled(Box)({
    alignSelf: `flex-end`
})

const Image = styled(CardMedia)({
    width: `50%`
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
                        <GroupDescription>
                            <Typography variant="h6">Group Description</Typography>
                            {props.group.description}
                        </GroupDescription>
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
        </GroupPage>
    )
}

const mapStateToProps = (state) => {
    return {
        group: state.groups.group
    }
}

export default connect(mapStateToProps)(GroupDetails);