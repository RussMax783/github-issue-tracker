export interface Repo {
  name: string;
  owner: string;
  id: string;
}

export interface Issue {
  id: string;
  avatar: string[];
  title: string;
  createdAt: string;
  updatedAt: string;
}
