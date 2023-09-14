import { classNames } from "shared/lib/classNames/classNames";
import { Button, Checkbox } from 'antd';
import { FC } from 'react'
import cls from "./Task.module.scss"
import { ReactNode } from "react";
import { CheckboxProps } from "antd/es/checkbox/Checkbox";

interface TaskProps extends Pick<CheckboxProps, 'onChange'>{
    className?: string;
    children: ReactNode;
    checked: boolean;
}

export const Task: FC<TaskProps> = (props) => {
    const {className, children, onChange, checked } = props
    return (
        <div className={classNames(cls.Task, {}, [className])}>
            <Checkbox checked={checked} onChange={onChange}></Checkbox>
            <a className="Text">{children}</a>
        </div>
    );
};