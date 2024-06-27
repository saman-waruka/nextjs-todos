"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";

import { loginSchema } from "@/components/Form/validation/loginSchema";
import InputField from "@/components/Form/Input/InputField";
import FormLabel from "@/components/Form/Label/FormLabel";
import ErrorLabel from "@/components/Form/Label/ErrorLabel";
import { AuthService } from "@/service/auth/authService";
import { ROUTE } from "@/constants/route";
import { Token } from "@/utils/token.utils";

export interface ILoginValues {
  username: string;
  password: string;
}

const initialValues: ILoginValues = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const token = useMemo(() => Token.get(), []);
  if (token) {
    redirect(ROUTE.TODO);
  }

  const onSubmit = useCallback(
    async (values: ILoginValues) => {
      const authService = new AuthService();
      try {
        const response = await authService.login(
          values.username,
          values.password
        );
        console.log(" Login response.data ", response.data);
        Token.set(response.data.access_token);
        router.push(ROUTE.TODO);
      } catch (error) {
        console.error(" Login error ", error);
        setErrorMessage("Invalid credential.");
      }
      console.log(values);
    },
    [router]
  );

  const formik = useFormik<ILoginValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: onSubmit,
  });

  console.log(" formik", formik);
  console.log(" formik.status", formik.status);

  return (
    <div className="flex flex-col align-middle">
      <form id="login-form" onSubmit={formik.handleSubmit}>
        <FormLabel text="Username: " />
        <InputField
          id="username"
          name="username"
          onChange={(e) => {
            formik.handleChange(e);
            setErrorMessage("");
          }}
        />
        {formik.errors.username ? (
          <ErrorLabel text={formik.errors.username} className="ml-3" />
        ) : null}

        <div className="h-6" />
        <FormLabel text="Password: " />
        <InputField
          id="password"
          className="ml-1"
          onChange={(e) => {
            formik.handleChange(e);
            setErrorMessage("");
          }}
          type="password"
        />
        {formik.errors.password ? (
          <ErrorLabel text={formik.errors.password} className="ml-3" />
        ) : null}
      </form>
      <ErrorLabel text={formik.errors.username} className="ml-3" />
      {errorMessage ? (
        <ErrorLabel
          text={errorMessage}
          className="mx-auto outline outline-1 outline-red-400 rounded-md py-1 px-2 mt-4"
        />
      ) : null}
      <button
        form="login-form"
        type="submit"
        className="mt-4 py-2 px-4 w-fit h-fit mx-auto rounded-sm bg-blue-300"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
