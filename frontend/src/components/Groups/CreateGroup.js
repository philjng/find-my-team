import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography
} from "@material-ui/core";
import {styled} from "@material-ui/styles";
import {CardHeader} from "./UserGroups";
import React, {useState} from "react";
import {BASKETBALL, BIKING, FRISBEE, RUNNING, SOCCER, TENNIS, VOLLEYBALL} from "../../tags";
import {connect} from "react-redux";
import {createGroup} from "../../actions/groups";
import {useHistory} from "react-router-dom";

const CreateGroupCard = styled(Card)({
    backgroundColor: `#d6f5ef`,
    margin: `2rem auto`,
    width: `75%`,
})

const Form = styled(Box)({
    display: `flex`,
    justifyContent: `space-around`
})

const Input = styled(TextField)({
    marginBottom: `1rem`
})

const ButtonGroup = styled(Box)({
    display: `flex`,
    float: `right`,
    margin: `1rem`,
    columnGap: `1rem`,
})

const CreateGroupPage = (props) => {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [checkbox, setCheckbox] = useState({
        Basketball: false,
        Biking: false,
        Frisbee: false,
        Running: false,
        Soccer: false,
        Tennis: false,
        Volleyball: false,
    });

    const history = useHistory();

    const handleSubmit = () => {
        // TODO: add more functionality for creating a group
        if (groupName.trim() === "") {
            window.alert("Group name is required.");
            return;
        }
        const keys = Object.keys(checkbox)
        const filtered = keys.filter((key) => checkbox[key])
        props.createGroup({
            creatorId: props.userId,
            creator: props.user,
            name: groupName,
            description: description.trim() === "" ? "No description." : description,
            tags: filtered,
            createdAt: new Date(),
            memberIds: [props.userId],
            groupSize: 1
        })
        setDescription("");
        history.push("/groups");
    }

    const handleCheckboxChange = (event) => {
        setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
    };

    return (
        <CreateGroupCard>
            <CardContent>
                <CardHeader align="center" variant="h5">Create Group</CardHeader>
                <Form>
                    <FormControl onSubmit={handleSubmit}>
                        <Typography>Group name:</Typography>
                        <Input
                            variant="filled"
                            size="small"
                            value={groupName}
                            required
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <Typography>Group description:</Typography>
                        <Input
                            variant="filled"
                            value={description}
                            multiline
                            rows={5}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormGroup>
                        <Typography>Group tags:</Typography>
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Basketball} onChange={handleCheckboxChange} name="Basketball" />}
                            label={BASKETBALL}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Biking} onChange={handleCheckboxChange} name="Biking" />}
                            label={TENNIS}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Frisbee} onChange={handleCheckboxChange} name="Frisbee" />}
                            label={SOCCER}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Running} onChange={handleCheckboxChange} name="Running" />}
                            label={FRISBEE}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Soccer} onChange={handleCheckboxChange} name="Soccer" />}
                            label={VOLLEYBALL}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Tennis} onChange={handleCheckboxChange} name="Tennis" />}
                            label={BIKING}
                            color="primary"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox.Volleyball} onChange={handleCheckboxChange} name="Volleyball" />}
                            label={RUNNING}
                            color="primary"
                        />
                    </FormGroup>
                </Form>
                <ButtonGroup>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Create Group
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {history.push("/groups")}}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </CardContent>
        </CreateGroupCard>
    )
}

const mapStateToProps = (state) => ({
    userId: state.user.user_id,
    user: state.user.name
})

export default connect(mapStateToProps, {createGroup})(CreateGroupPage);