import { useEffect, useState } from "react";
import { useAuthToken } from "../providers/AuthToken";
import { Issue, Repo } from "../types";
import { List } from "../common/List";
import { IssueItem } from "../common/Issue";

interface IssuesProps {
  repo: Repo;
}

export function Issues({ repo }: IssuesProps) {
  const { token } = useAuthToken();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>();

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
          setIssues(
            parsedResponse.map(
              (issue: any): Issue => ({
                id: issue.id,
                avatar: issue.assignees?.map((a: any) => a.avatar_url),
                createdAt: issue.created_at,
                title: issue.title,
                updatedAt: issue.updated_at,
              })
            )
          );
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getRepos();
    }
  }, [repo]);

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
    <List title="Issues">
      {issues?.map((issue) => (
        <IssueItem issue={issue} />
      ))}
    </List>
  );
}
