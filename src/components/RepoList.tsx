import styled from "styled-components";
import { Repo } from "../types";
import { List } from "../common/List";

interface RepoListProps {
  repos: Repo[];
  onSelectRepo: (repo: Repo) => void;
  selectedRepo?: Repo;
}

export function RepoList({ repos, onSelectRepo, selectedRepo }: RepoListProps) {
  return (
    <List title="Repos">
      {repos?.map((repo) => {
        return (
          <RepoButton onClick={() => onSelectRepo(repo)} key={repo.name} selected={repo.id === selectedRepo?.id}>
            {repo.name}
          </RepoButton>
        );
      })}
    </List>
  );
}

export const RepoButton = styled.button`
  color: #222222;
  text-align: left;
  width: 100%;
  font-size: 1em;
  padding: 0.25em 1em;
  border: none;
  background-color: ${(props) => (props.selected ? "#84c5f4" : "white")};

  &:hover {
    background-color: #84c5f4;
  }
`;
