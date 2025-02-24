import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import './exmaple.css';

export const Example = () => {
    const todoItems = [
        "Schedule perm",
        "Rewind VHS tapes",
        "Make change for the arcade",
        "Get disposable camera developed",
        "Learn C++",
        "Return Nintendo Power Glove",
    ];

    const doneItems = ["Pickup new mix-tape from Beth"];

    const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(
        todoItems,
        {
            group: "todoList"
        }
    );

    const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(
        doneItems,
        {
            group: "todoList"
        }
    );

    return (
        <div className="kanban-board">
            <div className="kanban-divider">
                <span>Todo</span>
                <ul ref={todoList}>
                    {todos.map((todo) => (
                        <li className="kanban-item" key={todo}>
                            {todo}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="kanban-divider">
                <span>Done</span>
                <ul ref={doneList}>
                    {dones.map((done) => (
                        <li className="kanban-item" key={done}>
                            {done}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};