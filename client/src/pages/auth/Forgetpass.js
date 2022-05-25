import React, { useEffect } from "react";
import Loader from "../../components/Loading";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import "./auth.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgetPassword } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";

const Forgetpass = () => {
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {}, [loading, message, error]);

  const initialValues = {
    email: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  const handleSubmit = (values) => {
    let data;

    console.log(values);

    if (values.email) {
      data = {
        email: values.email,
      };

      dispatch(forgetPassword(data));
    }
  };

  return (
    <>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            {message ? (
              <Message
                variation={
                  "p-3 mb-2 bg-light text-success text-center border border-success rounded-pill"
                }
              >
                {message}
              </Message>
            ) : (
              <div>
                {error && (
                  <Message
                    variation={
                      "p-3 mb-2 bg-light text-danger text-center border border-danger rounded-pill"
                    }
                  >
                    {error}
                  </Message>
                )}
                <Formik
                  initialValues={initialValues}
                  validationSchema={signInSchema}
                  onSubmit={(values, { resetForm, error }) => {
                    handleSubmit(values, resetForm, error);
                    resetForm({ values: "" });
                  }}
                >
                  {(formik) => {
                    const {
                      errors,
                      touched,
                      isValid,
                      dirty,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                    } = formik;

                    return (
                      <div className="container">
                        <Form onSubmit={handleSubmit}>
                          <div
                            className={`form-row ${
                              errors.email && touched.email
                                ? "input-error"
                                : null
                            }`}
                          >
                            <label htmlFor="email" className="form-label">
                              Enter your email.
                            </label>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className={`${
                                errors.email && touched.email
                                  ? "input-error"
                                  : null
                              } form-control`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="email"
                              component="span"
                              className="error"
                            />
                          </div>

                          <div className="d-grid gap-2 col-6 mx-auto">
                            <button
                              type="submit"
                              className={`mt-3 btn btn-primary`}
                              disabled={!(dirty && isValid)}
                            >
                              Send Email
                            </button>
                          </div>
                        </Form>
                      </div>
                    );
                  }}
                </Formik>
              </div>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default Forgetpass;
