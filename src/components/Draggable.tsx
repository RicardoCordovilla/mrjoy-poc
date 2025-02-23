import { useDraggable } from '@dnd-kit/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePatchData } from '../utils/api/hooks/usePatchData';

export interface ItemProps {
    id: string;
    serial: string;
    statusId: number;
    status: string | null;
    parent: number | undefined;
}
export function Draggable({ id, serial, status, parent }: ItemProps) {
    const { ref, isDropping } = useDraggable({
        id,
    });

    const queryClient = useQueryClient();

    const { mutate } = usePatchData();

    useEffect(() => {
        if (isDropping) {
            console.log('Dropping', id, parent);
            mutate({
                url: 'issues',
                id,
                data: {
                    statusId: parent,
                },
            }, {
                onSuccess: () => {
                    console.log('Success');
                    queryClient.invalidateQueries({ queryKey: ['issues'] });
                },
                onError: (error) => {
                    console.error(error);
                },
            });
        }
    }, [isDropping, id, parent, mutate, queryClient]);

    return (
        <button ref={ref}>
            Item {serial} - {status} - {parent}
        </button>
    );
}
