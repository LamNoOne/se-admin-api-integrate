import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import "./Form.scss"

const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Firstname is required"),

    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Lastname is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Invalid phone number"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password is too short - should be 4 chars min"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
})

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirmation:"",
}

const SignUpForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
                delete values.passwordConfirmation
                console.log(values)
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik
                return (
                    <div className="container">
                        <h1>Sign up</h1>
                        <p>Fill out the form to create a new account.</p>
                        <Form>
                            <div className="form-row">
                                <label htmlFor="firstName">First name</label>
                                <Field
                                    type="firstName"
                                    name="firstName"
                                    id="firstName"
                                    className={
                                        errors.firstName && touched.firstName
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="lastName">Last name</label>
                                <Field
                                    type="lastName"
                                    name="lastName"
                                    id="lastName"
                                    className={
                                        errors.lastName && touched.lastName
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <Field
                                    type="phoneNumber"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className={
                                        errors.phoneNumber && touched.phoneNumber
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="phoneNumber"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="email">Email Address</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={
                                        errors.email && touched.email
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={
                                        errors.password && touched.password
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
                                <Field
                                    type="password"
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    className={
                                        errors.passwordConfirmation && touched.passwordConfirmation
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="passwordConfirmation"
                                    component="span"
                                    className="error"
                                />
                            </div>
            
                            <button
                                type="submit"
                                className={
                                    !(dirty && isValid) ? "disabled-btn" : ""
                                }
                                disabled={!(dirty && isValid)}
                            >
                                Sign Un
                            </button>
                            <p className="no_account">
                                You have an account?&nbsp;
                                <a href="/signin">Sign in</a>
                            </p>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default SignUpForm
