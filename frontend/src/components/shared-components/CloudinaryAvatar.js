import { Avatar } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Image, Transformation } from "cloudinary-react";

function CloudinaryAvatar(props) {
  const { publicId, size } = props;

  const SCAvatar = styled(Avatar)({
    width: size,
    height: size,
  });

  return publicId ? (
    <Image cloudName="findmyteam" publicId={publicId} format="png">
      <Transformation crop="fill" width={size} height={size} />
      <Transformation radius="max" />
    </Image>
  ) : (
    <SCAvatar />
  );
}

export default CloudinaryAvatar;
