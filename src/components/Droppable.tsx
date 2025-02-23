import { useDroppable } from '@dnd-kit/react';

interface DroppableProps {
    id: number;
    children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
    const { ref, isDropTarget } = useDroppable({ id });

    return (
        <div ref={ref} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 300,
            backgroundColor: isDropTarget ? '#1eb99d25' : '#ffffff',
            border: '3px solid',
            borderColor: isDropTarget ? '#1eb99d' : '#00000020',
            borderRadius: 10,
        }}>
            {children}
        </div>
    );
}
