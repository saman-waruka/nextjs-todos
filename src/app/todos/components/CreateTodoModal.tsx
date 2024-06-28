"use client";
import React, { useCallback, useMemo, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import Modal from "react-modal";
import { Todo } from "../todo.interface";
import { TodoService } from "@/service/todo/todoService";
import { createTodoSchema } from "@/components/Form/validation/todoSchema";
import FormLabel from "@/components/Form/Label/FormLabel";
import InputField from "@/components/Form/Input/InputField";
import ErrorLabel from "@/components/Form/Label/ErrorLabel";

Modal.setAppElement("#root");

interface IFormValues {
  id?: string;
  title: string;
  description: string;
}

const initialFormValues: IFormValues = {
  title: "",
  description: "",
};

interface CreateTodoProps {
  onSuccess?: () => void;
  isEditMode?: boolean;
  initialValues?: IFormValues;
}

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

const CreateTodoModal = ({
  onSuccess = () => {},
  initialValues = initialFormValues,
  isEditMode = false,
}: CreateTodoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const todoService = useMemo(() => new TodoService(), []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSetShowSuccessAlert = useCallback(() => {
    setIsSuccess(true);
    onSuccess();
    setTimeout(() => setIsSuccess(false), 2000);
  }, [onSuccess]);

  const onSetShowErrorAlert = useCallback(() => {
    setIsError(true);
    setTimeout(() => setIsError(false), 2000);
  }, []);

  const onSubmit = useCallback(
    async (values: IFormValues, formikHelpers: FormikHelpers<IFormValues>) => {
      console.log("submit ", values);
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
        formikHelpers.resetForm();
        onClose();
      }
    },

    [onClose, onSetShowErrorAlert, onSetShowSuccessAlert, todoService]
  );

  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema: createTodoSchema,
    onSubmit: onSubmit,
  });

  const closeAndReset = useCallback(() => {
    onClose();
    formik.resetForm();
  }, [formik, onClose]);

  return (
    <div id="root" className="h-full w-full">
      {isEditMode ? null : (
        <div className="flex justify-center">
          <button
            className="mx-auto w-fit bg-blue-100 p-2 rounded-md outline outline-2 outline-blue-300 my-10"
            onClick={() => setIsOpen(true)}
          >
            + Create
          </button>
        </div>
      )}
      <div className="m-auto">
        <Modal isOpen={isOpen} style={customStyles}>
          <div>
            <div className="flex justify-end -mt-2">
              <button onClick={closeAndReset}>X</button>
            </div>

            <form
              id="login-form"
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-y-4 w-fit mx-auto"
            >
              <div className="flex w-fit justify-center align-middle">
                <FormLabel text="Title: " className="w-[100px]" />
                <InputField
                  id="title"
                  name="title"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <ErrorLabel text={formik.errors.title} className="ml-3" />
                ) : null}
              </div>
              <div className="flex w-fit">
                <FormLabel text="Description: " className="w-[100px]" />
                <InputField
                  id="description"
                  name="description"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <ErrorLabel
                    text={formik.errors.description}
                    className="ml-3"
                  />
                ) : null}
              </div>

              <div className="flex flex-row gap-x-5 mt-3 justify-center">
                <button
                  type="button"
                  className="p-2 px-3 rounded-md outline outline-2 outline-red-400"
                  onClick={closeAndReset}
                >
                  Cancel
                </button>
                <button
                  className="p-2 px-3 rounded-md outline outline-2 outline-blue-400 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </form>

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
