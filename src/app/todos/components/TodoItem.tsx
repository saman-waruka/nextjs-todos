import React, { ReactNode, useCallback, useState } from "react";
import { Todo } from "../todo.interface";
import Modal from "react-modal";
import { TodoService } from "@/service/todo/todoService";

interface TodoItemProps {
  todo: Todo;
  onSuccess?: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 600,
  },
};

export default function TodoItem({
  todo,
  onSuccess = () => {},
}: TodoItemProps) {
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const onDelete = useCallback(async () => {
    const todoService = new TodoService();
    try {
      console.log("delete: ", todo.id);
      const response = await todoService.delete(todo.id as string);
      console.log("delete response", response.data);
      onSuccess();
    } catch (error) {
      console.error("delete error: \n", error);
    }
  }, [onSuccess, todo.id]);

  return (
    <div
      key={todo.id}
      className=" relative border border-zinc-300 p-4 w-full rounded-lg "
    >
      <div className="relative flex flex-row justify-end -mt-2">
        <button
          className="relative z-10"
          onClick={(e) => {
            setIsShowConfirmDeleteModal(true);
          }}
        >
          X
        </button>
      </div>
      <div className="cursor-pointer" onClick={() => setIsEditMode(true)}>
        <div className="font-bold text-3xl">{todo.title}</div>
        <div className=" flex flex-row gap-x-2">
          <div>{todo.description}</div>
        </div>
        <div className=" text-sm text-right text-gray-500 font-bold">
          {(todo.date || todo.created_at || "") as ReactNode}
        </div>
      </div>

      <Modal isOpen={isShowConfirmDeleteModal} style={customStyles}>
        <div>
          <div className="flex justify-end -mt-2">
            <button onClick={() => setIsShowConfirmDeleteModal(false)}>
              X
            </button>
          </div>
          <div className="text-center">
            Want delete <b>{todo.title}</b> ?
          </div>
          <div className="flex flex-row gap-x-5 mt-3 justify-center">
            <button
              type="button"
              className="p-2 px-3 rounded-md outline outline-2 outline-red-400"
              onClick={() => setIsShowConfirmDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="p-2 px-3 rounded-md outline outline-2 outline-blue-400 disabled:cursor-not-allowed"
              onClick={onDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
