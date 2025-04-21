import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const { username, avatar } = user || {};

  return (
    <Avatar>
      <AvatarImage src={avatar ? avatar : "/default-user.jpg"} alt={`Avatar of ${username}`} />
    </Avatar>
  );
}

export default UserAvatar;
