// STARTING POINT: the sample Task Manager (state in App with useReducer, passed down as props).
// Assignment 3: change the state shape, add actions, add a filter bar (see the handout).
import { useReducer } from "react";
import {
    type Action,
    type Filter,
    initialState,
    type State,
    type Task,
    taskReducer,
} from "./taskReducer";
import TaskRow from "./TaskRow";
import type { Dispatch } from "react";
import { countByFilter, FILTERS, FILTERSFRIENDLY, filterTasks } from "./filter";

function AddForm({ dispatch }: { dispatch: Dispatch<Action> }) {
    function addTask(formData: FormData) {
        const title = String(formData.get("title") ?? "").trim();
        if (title) dispatch({ type: "add", id: crypto.randomUUID(), title });
    }
    return (
        <form action={addTask}>
            <input name="title" placeholder="New task" />
            <button type="submit">Add</button>
        </form>
    );
}
function AddFilterRow(
    { state, dispatch }: {
        state: State;
        dispatch: Dispatch<Action>;
    },
) {
    const FilterCounts = countByFilter(state.tasks);
    function FilterRow(filtername: Filter) {
        if (FILTERS.includes(filtername)) {
            dispatch({
                type: "setFilter",
                filter: filtername,
            });
        }
    }
    let buttons = [];
    for (const i in FILTERS) {
        const filter = FILTERS[i];
        const filterFriendly = FILTERSFRIENDLY[i];
        if (state.filter === filter) {
            buttons.push(
                <button
                    className="activeFilter"
                    value={filter}
                    type="submit"
                    onClick={() => FilterRow(filter)}
                >
                    {filterFriendly} ({FilterCounts[filter]})
                </button>,
            );
        } else {
            buttons.push(
                <button
                    value={filter}
                    type="submit"
                    onClick={() => FilterRow(filter)}
                >
                    {filterFriendly} ({FilterCounts[filter]})
                </button>,
            );
        }
    }

    return (
        <div>
            {buttons}
        </div>
    );
}
function AddClearButton({ dispatch }: { dispatch: Dispatch<Action> }) {
    function clearDone() {
        dispatch({ type: "clearDone" });
    }
    return (
        <form action={clearDone}>
            <button type="submit">Clear Done Tasks</button>
        </form>
    );
}
function AddUndoButton({ dispatch }: { dispatch: Dispatch<Action> }) {
    function undo() {
        dispatch({ type: "undo" });
    }
    return (
        <form action={undo}>
            <button type="submit">Undo</button>
        </form>
    );
}

function TaskList(
    { tasks, dispatch }: { tasks: Task[]; dispatch: Dispatch<Action> },
) {
    return (
        <ul>
            {tasks.map((t) => (
                <TaskRow
                    key={t.id}
                    task={t}
                    onNext={() => dispatch({ type: "advance", id: t.id })}
                    onDelete={() => dispatch({ type: "remove", id: t.id })}
                />
            ))}
        </ul>
    );
}

function FilteredTasks(
    { tasks, dispatch }: { tasks: Task[]; dispatch: Dispatch<Action> },
) {
    if (tasks.length == 0) {
        return <h1>There are no tasks that matches with this filter</h1>;
    }
    return (
        <ul>
            {tasks.map((t) => (
                <TaskRow
                    key={t.id}
                    task={t}
                    onNext={() => dispatch({ type: "advance", id: t.id })}
                    onDelete={() => dispatch({ type: "remove", id: t.id })}
                />
            ))}
        </ul>
    );
}

export default function App() {
    const [state, dispatch]: [State, Dispatch<Action>] = useReducer(
        taskReducer,
        initialState,
    );
    const visibleTasks = filterTasks(state.tasks, state.filter);
    return (
        <main>
            <h1>Task Manager</h1>
            <AddForm dispatch={dispatch} />
            <AddClearButton dispatch={dispatch} />
            <AddUndoButton dispatch={dispatch} />
            <TaskList tasks={state.tasks} dispatch={dispatch} />
            <AddFilterRow dispatch={dispatch} state={state} />
            <FilteredTasks tasks={visibleTasks} dispatch={dispatch} />
        </main>
    );
}
