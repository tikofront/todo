import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import "./style.scss";
import ViewItem from "../ViewItem";

const initialTodoData = {};
const initialTaskAndDate = {
    taskValue: "",
    dateValue: new Date(),
};

function TodoList() {
    const [todoData, setTodoData] = useState(initialTodoData);
    const [taskAndDate, setTaskAndDate] = useState(initialTaskAndDate);
    const [viewItem, setViewItem] = useState(null);

    const changeTaskValue = (e) => {
        setTaskAndDate({
            ...taskAndDate,
            taskValue: e.target.value,
        });
    };

    const changeDateValue = (a) => {
        const date = dayjs(a)
            .toDate()
            .toLocaleDateString()
            .toString()
            .replaceAll(".", "-");
        setTaskAndDate({
            ...taskAndDate,
            dateValue: date,
        });
    };

    const changeViewItem = (viewItem) => setViewItem(viewItem);
    const closeViewItem = () => setViewItem(null);

    const addTask = () => {
        if (taskAndDate.taskValue) {
            if (todoData[taskAndDate.dateValue]) {
                setTodoData({
                    ...todoData,
                    [taskAndDate.dateValue]: {
                        ...todoData[taskAndDate.dateValue],
                        tasks: [
                            ...todoData[taskAndDate.dateValue].tasks,
                            {
                                value: taskAndDate.taskValue,
                                isChecked: false,
                                id: "id-" + Math.random(),
                            },
                        ],
                    },
                });
            } else {
                setTodoData({
                    ...todoData,
                    [taskAndDate.dateValue]: {
                        id: taskAndDate.dateValue,
                        tasks: [
                            {
                                value: taskAndDate.taskValue,
                                isChecked: false,
                                id: "id-" + Math.random(),
                            },
                        ],
                    },
                });
            }
            setTaskAndDate(initialTaskAndDate);
        }
    };
    return (
        <div className="todo_list_wrapper">
            {viewItem && <ViewItem viewItem={viewItem} close={closeViewItem} />}
            <span className="todo_title">To do list</span>
            <div className="new_task_wrapper">
                <p className="new_task_title">New Task</p>
                <div className="new_task_inputs_wrapper">
                    <TextField
                        variant="outlined"
                        color="primary"
                        value={taskAndDate.taskValue}
                        onChange={changeTaskValue}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            onChange={changeDateValue}
                            value={dayjs(taskAndDate.dateValue)}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={addTask}>
                        Add
                    </Button>
                </div>
            </div>
            {!!Object.keys(todoData).length && (
                <div className="dates_wrapper">
                    <h3 className="dates_title">Dates</h3>
                    {Object.keys(todoData).map((date) => (
                        <div
                            className="task_item"
                            key={date}
                            onClick={() => changeViewItem(todoData[date])}
                        >
                            <p>
                                {date} ({todoData[date].tasks.length})
                            </p>
                            <p>
                                <ArrowForwardIosIcon />
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TodoList;
