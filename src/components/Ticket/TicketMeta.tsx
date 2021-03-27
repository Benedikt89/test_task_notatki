import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {selectUser} from "../../redux/data/selectors";
import Meta from "antd/lib/card/Meta";
import {Avatar} from "antd";
import * as React from "react";

interface I_MetaProps {
  lastModified: string,
  userId: string
}

export const TicketMeta: React.FC<I_MetaProps> = ({lastModified, userId}) => {
  const user = useSelector((state: AppStateType) => selectUser(state, userId));
  return (
    <Meta
      avatar={<Avatar src={user && user.avatar && user.avatar}/>}
      title={user && user.name ? user.name : "no name"}
      description={lastModified}
    />
  )
};