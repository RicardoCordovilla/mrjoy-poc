import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import './exmaple.css';
import { IssueGet } from "../../types/issues";
import { usePatchData } from "../../utils/api/hooks/usePatchData";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
    issues: IssueGet[] | undefined;
    setChangedData: (data: string) => void;
}

export const Example = ({ issues, setChangedData }: Props) => {
    const [todoItems, setTodoItems] = useState<IssueGet[]>(issues ? issues.filter((issue) => issue.statusId === 1) : []);
    const [doneItems, setDoneItems] = useState<IssueGet[]>(issues ? issues.filter((issue) => issue.statusId === 2) : []);


    const queryClient = useQueryClient();

    const { mutate } = usePatchData();

    const [todoList, todos] = useDragAndDrop<HTMLUListElement, IssueGet>(
        todoItems,
        {
            group: "todoList",
            onDragend: (result) => {
                const { draggedNode } = result;
                const Item: IssueGet = draggedNode.data.value as IssueGet;
                console.log(Item.serial);
                mutate({
                    url: 'issues',
                    id: Item.id,
                    data: {
                        statusId: 2
                    }
                }, {
                    onSuccess: () => {
                        console.log('Success');
                        setChangedData('change to todo');
                        window.location.reload();
                        queryClient.invalidateQueries({ queryKey: ['issues'] });
                    }

                })
            }
        },
    );

    const [doneList, dones] = useDragAndDrop<HTMLUListElement, IssueGet>(
        doneItems,
        {
            group: "todoList",
            onDragend: (result) => {
                const { draggedNode } = result;
                const Item: IssueGet = draggedNode.data.value as IssueGet;
                console.log(Item.serial);
                mutate({
                    url: 'issues',
                    id: Item.id,
                    data: {
                        statusId: 1
                    }
                }, {
                    onSuccess: () => {
                        console.log('Success');
                        setChangedData('change to done');
                        window.location.reload();
                        queryClient.invalidateQueries({ queryKey: ['issues'] });
                    }

                })
            }
        }
    );

    useEffect(() => {
        setTodoItems(issues ? issues.filter((issue) => issue.statusId === 1) : []);
        setDoneItems(issues ? issues.filter((issue) => issue.statusId === 2) : []);
    }, [issues, todoList, doneList]);

    return (
        <div className="kanban-board" >
            <ul ref={todoList}>
                {todos.map((todo) => (
                    <li className="kanban-item" key={todo.id}>
                        {todo.serial}-{todo.statusId}
                    </li>
                ))}
            </ul>
            <ul ref={doneList}>
                {dones.map((done) => (
                    <li className="kanban-item" key={done.id}>
                        {done.serial}-{done.statusId}
                    </li>
                ))}
            </ul>
        </div >
    );
};