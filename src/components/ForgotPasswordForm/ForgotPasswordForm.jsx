import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import "./Form.scss"

const forgotPassword = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
})

const initialValues = {
    email: "",
}

const ForgotPasswordForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={forgotPassword}
            onSubmit={(values) => {
                console.log(values)
                
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik
                return (
                    <div className="container">
                        <h1>Forgot Password</h1>
                        <p>Please fill your email to get a recovery code.</p>
                        <Form>
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

                            <button
                                type="submit"
                                className={
                                    !(dirty && isValid) ? "disabled-btn" : ""
                                }
                                disabled={!(dirty && isValid)}
                            >
                                Submit
                            </button>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default ForgotPasswordForm
