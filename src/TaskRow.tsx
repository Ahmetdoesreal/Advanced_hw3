// Ahmet Deniz Sezgin — 2300005633
//i dont think i made any changes to this file tho

import type { Task } from "./taskReducer";

type TaskRowProps = { task: Task; onNext: () => void; onDelete: () => void };

export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
    return (
        <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ flex: 1 }}>{task.title}</span>
            <em>{task.status}</em>
            <button onClick={onNext}>Next</button>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}
