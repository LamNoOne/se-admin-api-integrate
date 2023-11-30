import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { setCredentials } from "../../features/auth/authSlice"
import { useDispatch } from "react-redux"

import "./Form.scss"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../features/auth/authApiSlice"

const signInSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
})

const initialValues = {
    username: "",
    password: "",
}

const SignInForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()

    const handleSubmit = async (values) => {
        try {
            const userData = await login(values).unwrap()
            dispatch(setCredentials(userData))
            localStorage.setItem(
                "admin",
                JSON.stringify(userData.metadata.user)
            )
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik
                return (
                    <div className="container">
                        <h1>Sign in</h1>
                        <p>Log in to your account to continue.</p>
                        <Form>
                            <div className="form-row">
                                <label htmlFor="username">Username</label>
                                <Field
                                    type="username"
                                    name="username"
                                    id="username"
                                    className={
                                        errors.username && touched.username
                                            ? "input-error"
                                            : null
                                    }
                                />
                                <ErrorMessage
                                    name="username"
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
                            <a
                                className="forgot_password"
                                href="/forgot-password"
                            >
                                Forgot password?
                            </a>
                            <button
                                type="submit"
                                className={
                                    !(dirty && isValid) ? "disabled-btn" : ""
                                }
                                disabled={!(dirty && isValid)}
                            >
                                Sign In
                            </button>
                            <p className="no_account">
                                Don't have an account?&nbsp;
                                <a href="/signup">Sign up</a>
                            </p>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default SignInForm
