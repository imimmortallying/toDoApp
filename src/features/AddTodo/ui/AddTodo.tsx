import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AddTodo.module.scss"
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { add } from "features/todosReducer/todosSlice";
import { useRef } from "react";

interface AddTodoProps {
    className?: string;
}

export const AddTodo = ({className}:AddTodoProps) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    return (
        <div className={classNames(cls.AddTodo, {}, [className])}>
                    <input ref={inputRef}></input>
                    <Button
                        type="text"
                        onClick={() => { dispatch(add({ id: crypto.randomUUID(), text: inputRef.current.value })), inputRef.current.value = '' }}>
                        добавить задачу
                    </Button>
        </div>
    );
};

