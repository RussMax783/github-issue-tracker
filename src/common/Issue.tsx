import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "styled-components";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { Issue } from "../types";
import { useRef } from "react";

interface IssueProps {
  issue: Issue;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export function IssueItem({ issue, moveCard, index }: IssueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: issue.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <IssueItemContainer ref={ref} style={{ opacity }}>
      <Row>
        <h4>
          {issue.title} {issue.id}
        </h4>
        {issue.avatar?.map((avatar) => (
          <Avatar key={avatar} src={avatar} />
        ))}
      </Row>
      <Row>
        <span>{format(new Date(issue.createdAt), "dd/MM/yyyy")}</span>
        <span>{formatDistanceToNow(new Date(issue.updatedAt))} ago</span>
      </Row>
    </IssueItemContainer>
  );
}

const IssueItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25em;
  border: 1px solid #222;
  border-radius: 4px;
  margin-bottom: 1em;
  cursor: grab;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 1em;
`;
