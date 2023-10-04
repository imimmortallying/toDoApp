import { classNames } from "shared/lib/classNames/classNames";
import { Button, Checkbox, Select } from 'antd';
import { FC, useRef, useEffect } from 'react'
import cls from "./Todo.module.scss"
import { ReactNode } from "react";
import { CheckboxProps } from "antd/es/checkbox/Checkbox";

//
import { useDispatch, useSelector } from 'react-redux';
import { remove, selectTodoById, toggle, changeImportance } from "features/todosReducer/todosSlice";
import { importanceInitial } from "entities/importanceFilterInitial/ImportanceFilterInitial";
import { Link } from "react-router-dom";


interface TaskProps extends Pick<CheckboxProps, 'onChange' | 'onClick'> {
    id: string
}

export const Todo: FC<TaskProps> = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const todo = useSelector(state => selectTodoById(state, id))
    const { text, completed, importance, description } = todo;


    return (

        <div className={classNames(cls.Task, {}, [])}>

            <Checkbox
                onChange={() => dispatch(toggle(id))}
                checked={completed}
            >
            </Checkbox>

            {/* в линк передать Index todo. Этот же индекс будет передан в App <route path= index />*/}
            <Link
                state={id}
                to={'/todo'}
                className={classNames(cls.Text, {}, [])}
            >
                {text}
            </Link>

            <div className={classNames(cls.description, {}, [])}>{description}</div>

            <Select
                size="small"
                options={[...importanceInitial, { value: 'not chosen', label: 'Не выбран' }]}
                style={{ width: 180 }}
                // placeholder="Выбери статус" // его не видно, приходится добавлять его как value, а это не серый, а черный цвет текста
                onChange={(value) => dispatch(changeImportance({ id, value }))}
                value={importance === 'not chosen' ? 'Выбери статус' : importance}
            />

            <Button
                onClick={() => dispatch(remove(id))}


                className={classNames(cls.Button, {}, [])}
                type="link"
                danger
                size='small'

            >
                удалить
            </Button>
        </div>
    );
};

