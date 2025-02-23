import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { CSSProperties, useEffect, useState } from 'react';

import { Column } from './Column';
import { Item } from './Item';

const styles: CSSProperties = { display: 'inline-flex', flexDirection: 'row', gap: 20 };

export function Example({ style = styles }) {
    const [items, setItems] = useState({
        A: ['A0', 'A1', 'A2'],
        B: ['B0', 'B1'],
        C: [],
    });

    useEffect(() => {
        console.log(items)
    }, [items])


    return (
        <DragDropProvider
            onDragOver={(event) => {
                setItems((items) => move(items, event));
            }}

        >
            <div style={style}>
                {Object.entries(items).map(([column, items]) => (
                    <Column key={column} id={column}>
                        {items.map((id, index) => (
                            <Item key={id} id={id} index={index} column={column} />
                        ))}
                    </Column>
                ))}
            </div>
        </DragDropProvider>
    );
}
