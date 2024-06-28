"use client";

import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";

import { registerSchema } from "@/components/Form/validation/authSchema";
import InputField from "@/components/Form/Input/InputField";
import FormLabel from "@/components/Form/Label/FormLabel";
import ErrorLabel from "@/components/Form/Label/ErrorLabel";
import { AuthService } from "@/service/auth/authService";
import { ROUTE } from "@/constants/route";
import { Token } from "@/utils/token.utils";
import ReactModal from "react-modal";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";

export interface ILoginValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: ILoginValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const InputRow = ({ children }: { children: ReactNode }) => {
  return <div className="relative w-fit flex flex-row">{children}</div>;
};

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

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(async (values: ILoginValues) => {
    const authService = new AuthService();
    console.log("values ", values);
    try {
      const response = await authService.register(
        values.username,
        values.password
      );
      console.log(" Register response.data ", response.data);
      setIsShowSuccessModal(true);
    } catch (error) {
      console.error("Register error ", error);
      setErrorMessage("Invalid credential.");
    }
    console.log(values);
  }, []);

  const formik = useFormik<ILoginValues>({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: onSubmit,
  });

  console.log(" formik", formik);
  console.log(" formik.status", formik.status);

  const onClickSuccessModal = useCallback(() => {
    setIsShowSuccessModal(false);
    router.push(ROUTE.LOGIN);
  }, [router]);

  return (
    <main className="flex h-screen flex-col p-24 align-middle">
      <form
        id="login-form"
        onSubmit={formik.handleSubmit}
        className="w-fit mx-auto my-auto"
      >
        <Logo />
        <InputRow>
          <FormLabel text="Username: " className="w-[200px]" />
          <InputField
            id="username"
            name="username"
            className="w-[200px]"
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
          />
          {formik.errors.username ? (
            <ErrorLabel text={formik.errors.username} className="ml-3" />
          ) : null}
        </InputRow>
        <div className="h-6" />
        <InputRow>
          <FormLabel text="Password: " className="w-[200px]" />
          <InputField
            id="password"
            className="w-[200px]"
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
            type="password"
          />
          {formik.errors.password ? (
            <ErrorLabel text={formik.errors.password} className="ml-3" />
          ) : null}
        </InputRow>
        <div className="h-6" />
        <InputRow>
          <FormLabel text="Confirm Password: " className="w-[200px]" />
          <InputField
            id="confirmPassword"
            className="min-w-[200px]"
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage("");
            }}
            type="password"
          />
          {formik.errors.confirmPassword ? (
            <ErrorLabel text={formik.errors.confirmPassword} className="ml-3" />
          ) : null}
        </InputRow>

        {errorMessage ? (
          <ErrorLabel
            text={errorMessage}
            className="mx-auto outline outline-1 outline-red-400 rounded-md py-1 px-2 mt-4"
          />
        ) : null}
        <div className="mt-3 text-right text-[10px]">
          Already have an account?{" "}
          <Link
            href={ROUTE.LOGIN}
            className="font-bold text-[12px] text-blue-500"
          >
            Login
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            form="login-form"
            type="submit"
            className="mt-4 py-2 px-4 w-fit h-fit mx-auto rounded-sm bg-blue-300"
          >
            Register
          </button>
        </div>
      </form>

      <ReactModal isOpen={isShowSuccessModal} style={customStyles}>
        <div className="flex flex-col justify-center align-middle px-3">
          <div className="w-fit mx-auto text-2xl">Success Register </div>
          <button
            onClick={onClickSuccessModal}
            className="mt-3 mx-auto p-2 px-3 rounded-md outline outline-2 outline-blue-400 "
          >
            Go to Login
          </button>
        </div>
      </ReactModal>
    </main>
  );
}
