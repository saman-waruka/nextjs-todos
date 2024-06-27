"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import Modal from "react-modal";
import { Todo } from "../todo.interface";
import { TodoService } from "@/service/todo/todoService";
import { createTodoSchema } from "@/components/Form/validation/todoSchema";
import FormLabel from "@/components/Form/Label/FormLabel";

Modal.setAppElement("#root");

interface CreateTodoProps {
  onCreateSuccess?: () => void;
}

interface IFormValues {
  title: string;
  desc: string;
}

const initialValues: IFormValues = {
  title: "",
  desc: "",
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 500,
  },
};

const CreateTodoModal = ({ onCreateSuccess = () => {} }: CreateTodoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const todoService = useMemo(() => new TodoService(), []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSetShowSuccessAlert = useCallback(() => {
    setIsSuccess(true);
    onCreateSuccess();
    setTimeout(() => setIsSuccess(false), 2000);
  }, [onCreateSuccess]);

  const onSetShowErrorAlert = useCallback(() => {
    setIsError(true);
    setTimeout(() => setIsError(false), 2000);
  }, []);

  const onSubmit = useCallback(
    async (values: IFormValues, actions: any) => {
      console.log(" submit ");
      alert("Submit");
      try {
        const newTodo: Todo = {
          ...values,
          no: Math.ceil(Math.random() * 1000),
          completed: false,
          date: new Date(),
        };

        const response = await todoService.create(newTodo);
        console.log("response.data", response.data);
        onSetShowSuccessAlert();
      } catch (error) {
        console.error(" Create todo error\n", error);
        onSetShowErrorAlert();
      } finally {
        actions.resetForm({
          values: initialValues,
        });
      }
    },

    [onSetShowErrorAlert, onSetShowSuccessAlert, todoService]
  );

  return (
    <div id="root" className="h-full w-full">
      <div className="flex justify-center">
        <button
          className="mx-auto w-fit bg-blue-100 p-2 rounded-md outline outline-2 outline-blue-300 my-10"
          onClick={() => setIsOpen(true)}
        >
          + Create
        </button>
      </div>
      <div className="m-auto">
        <Modal isOpen={isOpen} style={customStyles}>
          <div>
            <div className="flex justify-end -mt-2">
              <button onClick={onClose}>X</button>
            </div>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={createTodoSchema}
            >
              {({ isSubmitting }) => (
                <Form className="">
                  <div className="flex">
                    <FormLabel text="Title:" className="mr-3" />
                    <Field
                      className="px-2"
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 ml-3"
                    />
                  </div>
                  <div className="flex">
                    <FormLabel text="Description:" className="mr-3" />

                    <Field
                      className="px-2"
                      type="textarea"
                      name="desc"
                      placeholder="Enter description"
                      disabled={isSubmitting}
                      columns={40}
                      row={20}
                    />
                    <ErrorMessage
                      name="desc"
                      component="div"
                      className="text-red-500 ml-3"
                    />
                  </div>

                  <div className="flex flex-row gap-x-5 mt-3 justify-center">
                    <button
                      type="button"
                      className="p-2 px-3 rounded-md outline outline-2 outline-red-400"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="p-2 px-3 rounded-md outline outline-2 outline-blue-400 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => alert("5555")}
                    >
                      Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {isSuccess && (
              <div className=" mx-auto w-1/3 bg-green-100 border border-green-400 text-green-400 px-4 py-3 rounded relative">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline ml-5">Created new todo.</span>
              </div>
            )}

            {isError && (
              <div className=" mx-auto w-1/3 bg-red-100 border border-red-400 text-red-400 px-4 py-3 rounded relative">
                <strong className="font-bold">Oops!</strong>
                <span className="block sm:inline ml-5">
                  Something went wrong.
                </span>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateTodoModal;
