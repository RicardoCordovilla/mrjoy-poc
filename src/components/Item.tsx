import { useSortable } from '@dnd-kit/react/sortable';
import { JSX } from 'react';

interface ItemProps {
  id: string | number;
  column: string;
  index: number;
}

export function Item({ id, column, index }: ItemProps): JSX.Element {
  const { ref } = useSortable({
    id,
    index,
    group: column,
    type: 'item',
    accept: ['item'],
  });

  return <button ref={ref}>{id}</button>;
}