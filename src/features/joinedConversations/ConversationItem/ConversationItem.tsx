import React from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  MessageCount,
  IconWrapper
} from "./ConversationItem.style";
import { Leave } from "foundations/components/icons/Leave";
import useHover from "foundations/hooks/useHover";
import { DEFAULT_CONVERSATION } from "features/currentConversation/currentConversationModel";

interface ConversationItemProps {
  selected: boolean;
  id: string;
  name: string;
  unreadMessageCount: number;
  onClick: () => void;
  onLeave: () => void;
}

const ConversationItem = ({
  selected,
  id,
  name,
  onClick,
  onLeave,
  unreadMessageCount
}: ConversationItemProps) => {
  
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 1 });
  const canLeave: boolean = id !== DEFAULT_CONVERSATION;
  //console.log(id);
  //console.log(name);
  // console.log(onLeave);
  // console.log(onClick);
  //console.log(unreadMessageCount);
  
  return (
    <Wrapper
      {...hoverProps}
      selected={selected}
      emphasized={unreadMessageCount > 0}
      onClick={onClick}
    >
      <Body>
        <ConversationIcon selected={selected}>#</ConversationIcon>
        <Name>{name}</Name>
      </Body>
      {isHovering && canLeave ? (
        <IconWrapper
          onClick={e => {
            e.stopPropagation();
            onLeave();
          }}
        >
          <Leave fill={selected ? "white" : "#979797"} />
        </IconWrapper>
      ) : (
          <MessageCount>{unreadMessageCount}</MessageCount>
      )}
    </Wrapper>
  );
};

export { ConversationItem };
