import React, { JSX, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';

interface ColumnProps {
    children: ReactNode;
    id: string | number;
}

const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    minWidth: 200,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
};

export function Column({ children, id }: ColumnProps): JSX.Element {
    const { ref } = useDroppable({
        id,
        type: 'column',
        accept: ['item'],
        collisionPriority: CollisionPriority.Low,
    });

    return (
        <div style={styles} ref={ref as React.Ref<HTMLDivElement>}>
            {children}
        </div>
    );
}