"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

import { loginSchema } from "@/components/Form/validation/authSchema";
import InputField from "@/components/Form/Input/InputField";
import FormLabel from "@/components/Form/Label/FormLabel";
import ErrorLabel from "@/components/Form/Label/ErrorLabel";
import { AuthService } from "@/service/auth/authService";
import { ROUTE } from "@/constants/route";
import { Token } from "@/utils/token.utils";
import Logo from "@/components/Logo/Logo";

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
    <div className="flex flex-col align-middle my-auto">
      <form id="login-form" onSubmit={formik.handleSubmit}>
        <Logo />
        <FormLabel text="Username: " />
        <InputField
          id="username"
          name="username"
          onChange={(e) => {
            formik.handleChange(e);
            setErrorMessage("");
          }}
          value={formik.values.username}
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
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <ErrorLabel text={formik.errors.password} className="ml-3" />
        ) : null}
      </form>
      {errorMessage ? (
        <ErrorLabel
          text={errorMessage}
          className="mx-auto outline outline-1 outline-red-400 rounded-md py-1 px-2 mt-4"
        />
      ) : null}
      <div className="mt-3 text-right text-[10px]">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTE.REGISTER}
          className="font-bold text-[12px] text-blue-500"
        >
          Register
        </Link>
      </div>
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
