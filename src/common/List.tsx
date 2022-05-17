import styled from "styled-components";

interface ListProps {
  title: string;
  children: React.ReactNode;
}

export function List({ title, children }: ListProps) {
  return (
    <ListContainer>
      <Title>{title}</Title>
      {children}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h3`
  padding: 0.5em 1em;
  border-bottom: 1px solid black;
`;
