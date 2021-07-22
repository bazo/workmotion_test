import { Image } from "@chakra-ui/react";
import { VFC } from "react";

interface EmployeeAvatarProps {
	name: string;
}

const EmployeeAvatar: VFC<EmployeeAvatarProps> = ({ name }) => {
	return <Image src={`https://joeschmoe.io/api/v1/${name}`} alt={name} borderRadius="full" objectFit="cover" boxSize="50px" />;
};

export default EmployeeAvatar;
