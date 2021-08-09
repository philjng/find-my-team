import { Avatar } from "@material-ui/core";
import { Image, Transformation } from "cloudinary-react";

function CloudinaryAvatar(props) {
  const { publicId, size } = props;
  return (
    publicId ?
    <Image cloudName="findmyteam" publicId={publicId} format="png">
      <Transformation crop="fill" width={size} height={size} />
      <Transformation radius="max" />
    </Image> : <Avatar width={size} height={size} />
  );
}

export default CloudinaryAvatar;
