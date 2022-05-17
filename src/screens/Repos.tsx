import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Issues } from "../components/Issues";
import { RepoList } from "../components/RepoList";
import { useAuthToken } from "../providers/AuthToken";
import { Repo } from "../types";

interface ReposProps {}

export const Repos: FC<ReposProps> = ({}) => {
  const { token } = useAuthToken();
  const [repos, setRepos] = useState<Repo[]>();
  const [error, setError] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repo>();

  useEffect(() => {
    const getRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/user/repos", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${token}`,
          },
        });
        const parsedResponse = await response.json();
        setRepos(parsedResponse.map((repo: any) => ({ id: repo.id, name: repo.name, owner: repo.owner.login })));
      } catch (err) {
        console.log(err);
        setError("Error loading repos");
      }
    };
    getRepos();
  }, [token]);

  if (error) {
    return <span>Error</span>;
  }

  return (
    <RepoPage>
      <RepoList repos={repos ?? []} onSelectRepo={setSelectedRepo} selectedRepo={selectedRepo} />
      {!!selectedRepo && <Issues repo={selectedRepo} />}
    </RepoPage>
  );
};

const RepoPage = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 24px;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
