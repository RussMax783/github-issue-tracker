import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "styled-components";
import { Issue } from "../types";

interface IssueProps {
  issue: Issue;
}

export function IssueItem({ issue }: IssueProps) {
  return (
    <IssueItemContainer>
      <Row>
        <h4>{issue.title}</h4>
        {issue.avatar?.map((avatar) => (
          <Avatar src={avatar} />
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
