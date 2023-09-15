import { classNames } from "shared/lib/classNames/classNames";
import { FC, ReactNode, useState, useRef, useEffect, useId } from 'react';
import cls from "./MainPage.module.scss"
import { Task } from "entities/Task";
import { Button, Input } from 'antd';

import { v4 as uuidv4 } from 'uuid'
import initTasksState from "entities/getTasksList/initTaskState";

interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = (props) => {

    // логика изменения состояния задачи
    const tasksState = initTasksState();
    const tasks = tasksState.tasks;
    const setTodos = tasksState.setTodos;
    

    const handleCheckboxChange = (item: { id: `${string}-${string}-${string}-${string}-${string}`, text: string, isDone: boolean }) => {
        const newTasks = tasks.map((i) => {
            return i.id === item.id ? { ...item, isDone: !item.isDone } : i;
        })
        setTodos(newTasks)
        console.log(newTasks)
    }
    ///

    const removeTask = (item: { id: `${string}-${string}-${string}-${string}-${string}`, text: string, isDone: boolean }) => {
        const tasksUpdated = tasks.filter(i => i.id !== item.id)
        setTodos(tasksUpdated)
    }

    // useRef для инпута
    const inputRef = useRef(null);

    function handleAddButtonClick() {
        const newTask = { id: crypto.randomUUID(), text: inputRef.current.value, isDone: false }
        const tasksUpdated = [...tasks];
        tasksUpdated.push(newTask)
        setTodos(tasksUpdated)

        // добавить проверку пустоты input
    }

    // 





    const { className, children } = props
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <div className="header-container">
                <div className="header__label">Tasks list</div>
                <div className="header__filters">
                    <Button type="primary" className="header__filter">All</Button>
                    <Button type="primary" className="header__filter">Opened</Button>
                    <Button type="primary" className="header__filter">Closed</Button>
                </div>

                <div className="header__new-task-block">
                    <input ref={inputRef}></input>
                    {/* <Input type='text' placeholder="новая задача" /> */}
                    <Button
                        type="text"
                        onClick={handleAddButtonClick}>
                        добавить задачу
                    </Button>




                </div>
            </div>

            <div className="content-container">

                {tasks.map((item) =>
                    <Task
                        key={item.id}
                        checked={item.isDone}
                        onChange={() => handleCheckboxChange(item)}
                        onClick={()=>removeTask(item)}
                    >
                        {item.text}
                    </Task>
                )}
            </div>
        </div>
    );
};