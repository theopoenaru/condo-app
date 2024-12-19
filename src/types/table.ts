export interface TableMeta<T> {
  onEdit: (record: T) => void;
  onDelete: (record: T) => void;
}

export interface FilterField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: { label: string; value: string }[];
}