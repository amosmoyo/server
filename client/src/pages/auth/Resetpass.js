import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/action/index";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loading";
import Message from "../../components/Message";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Resetpass = () => {
  const { token } = useParams();

  const dispatch = useDispatch();

  const { message, error, loading } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {}, [token]);

  const initialValues = {
    password: "",
    passwordConfirmation: "",
  };

  const resetSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 4 chars minimum"),

    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = (values) => {
    let data;

    if (values.password && values.passwordConfirmation) {
      data = {
        password: values.password,
        token,
      };

      dispatch(resetPassword(data));
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
                  validationSchema={resetSchema}
                  onSubmit={(values, { resetForm, error }) => {
                    handleSubmit(values);
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
                        <h1 className="mb-4">Reset password</h1>
                        <Form onSubmit={handleSubmit}>
                          <div
                            className={`form-row ${
                              errors.password && touched.password
                                ? "input-error"
                                : null
                            }`}
                          >
                            <label htmlFor="password" className="form-label">
                              New Password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className={`${
                                errors.password && touched.password
                                  ? "input-error"
                                  : null
                              } form-control`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="password"
                              component="span"
                              className="error"
                            />
                          </div>

                          <div
                            className={`form-row ${
                              errors.passwordConfirmation &&
                              touched.passwordConfirmation
                                ? "input-error"
                                : null
                            }`}
                          >
                            <label
                              htmlFor="passwordConfirmation"
                              className="form-label"
                            >
                              Confirm Password
                            </label>
                            <Field
                              type="password"
                              name="passwordConfirmation"
                              id="passwordConfirmation"
                              className={`${
                                errors.passwordConfirmation &&
                                touched.passwordConfirmation
                                  ? "input-error"
                                  : null
                              } form-control`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="passwordConfirmation"
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
                              Reset password
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

export default Resetpass;
