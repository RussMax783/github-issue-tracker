import { useCallback, useEffect, useState } from "react";
import { useAuthToken } from "../providers/AuthToken";
import { Issue, Repo } from "../types";
import { List } from "../common/List";
import { IssueItem } from "../common/Issue";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

interface IssuesProps {
  repo: Repo;
}

function saveSortOrder(repoId: string, issues: Issue[]) {
  localStorage.setItem(repoId, JSON.stringify(issues));
}

function loadSortOrder(repoId: string): Issue[] {
  const items = localStorage.getItem(repoId);
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

export function Issues({ repo }: IssuesProps) {
  const { token } = useAuthToken();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (repo) {
      setLoading(true);
      const getRepos = async () => {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/issues`, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `Bearer ${token}`,
            },
          });

          const parsedResponse = await response.json();
          const currentOrder = loadSortOrder(repo.id);

          setIssues(
            parsedResponse.reduce((acc: Issue[], issue: any) => {
              if (acc.some((i) => i.id === issue.id)) return acc;
              acc.push({
                id: issue.id,
                avatar: issue.assignees?.map((a: any) => a.avatar_url),
                createdAt: issue.created_at,
                title: issue.title,
                updatedAt: issue.updated_at,
              });
              return acc;
            }, currentOrder)
          );
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getRepos();
    }
  }, [repo]);

  useEffect(() => {
    if (issues && issues.length) {
      saveSortOrder(repo.id, issues);
    }
  }, [issues]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setIssues((prevIssues: Issue[]) =>
      update(prevIssues, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevIssues[dragIndex] as Issue],
        ],
      })
    );
  }, []);

  if (loading) {
    return (
      <List title="Issues">
        <span>Loading Issues</span>
      </List>
    );
  }

  if (!issues || !issues.length) {
    return (
      <List title="Issues">
        <span>No issues in this repo</span>
      </List>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <List title="Issues">
        <IssuesList>
          {issues.map((issue, index) => (
            <IssueItem key={issue.id} issue={issue} moveCard={moveCard} index={index} />
          ))}
        </IssuesList>
      </List>
    </DndProvider>
  );
}

const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
