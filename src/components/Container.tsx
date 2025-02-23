import { DragDropProvider } from '@dnd-kit/react';
import { useState } from 'react';
import { IssueGet } from '../types/issues';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

interface ItemProps {
    items: IssueGet[] | undefined;
}

export const Container = ({ items }: ItemProps) => {
    console.log(items);
    const [parent, setParent] = useState<number | undefined>(1);
    const issues = items?.map((issue) => {
        return (
            <Draggable
                key={issue.id} id={issue.id}
                serial={issue.serial}
                statusId={issue.statusId}
                status={issue.status}
                parent={parent}
            />
        )
    });





    return (
        <DragDropProvider
            onDragEnd={(event) => {
                const { target } = event.operation;
                if (event.canceled) return;
                setParent(target ? Number(target.id) : undefined);
            }}
        >
            <section
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: 20,
                    gap: 20,
                }}
            >
                <Droppable id={1}>
                    {
                        parent === 1 ?
                            <div>
                                {issues?.filter((issue) => issue.props.parent === 1)}
                            </div>
                            : null
                    }

                </Droppable>
                <Droppable id={2}>
                    {
                        parent === 2 ?
                            <div>
                                {issues?.filter((issue) => issue.props.parent === 2)}
                            </div>
                            : null
                    }
                </Droppable>
            </section>
        </DragDropProvider>
    );
}


