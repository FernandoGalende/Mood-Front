export interface Thought {
  answered: boolean;
  date: string;
  dateLastModified: string;
  id: string;
  message: string;
  read: boolean;
  type: string;
  isAnonymous: boolean;
  user: string;
  conversation?: Object[];
}
