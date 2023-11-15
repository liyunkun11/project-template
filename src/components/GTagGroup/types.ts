export interface TagItem {
  title?: string;
  color?: string;
  [key: string]: any;
}

export interface TagGroupProps {
  tags: TagItem[];
  max?: number;
  color?: string;
  fieldNames?: {
    title: string;
  };
}
