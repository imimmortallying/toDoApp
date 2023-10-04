import { classNames } from "shared/lib/classNames/classNames";
import { FC, ReactNode, useState, useRef, useEffect, useId } from 'react';
import cls from "./MainPage.module.scss"
import { Button, Checkbox } from 'antd';


//redux toolkit
import { TodoList } from "widgets/TodoList";
import { FilterAccomplishmentBtns } from "features/FilterAcomplishmentBtns";
import { FilterImportance } from "features/FilterImportance";
import { AddTodo } from "features/AddTodo";
import { FindTodo } from "features/FindTodo";


//
interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = (props) => {
    const { className, children } = props

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>

            <div className="header-container">
                <FilterAccomplishmentBtns></FilterAccomplishmentBtns>
                <FilterImportance></FilterImportance>
                <FindTodo></FindTodo>                  
                <AddTodo></AddTodo>
            </div>

            <div className={cls.content_container}>
                {<TodoList></TodoList>}
            </div>
        </div>
    );
};
