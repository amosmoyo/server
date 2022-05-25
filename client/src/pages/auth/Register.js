import React, {useEffect} from "react";
import FormContainer from "../../components/FormContainer";
import "./auth.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loading";
import Message from "../../components/Message";

const Register = () => {
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {
  }, [loading])

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 4 chars minimum"),

    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmitForm = (values, resetForm, error) => {
    let signUpData;

    if (values.email && values.password) {
      let name = `${values.firstName} ${values.lastName}`;
      signUpData = {
        name,
        email: values.email,
        password: values.password,
      };

      dispatch(register(signUpData));
    }
  };

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error && (
            <Message variation={"p-3 mb-2 bg-light text-danger text-center border border-danger rounded-pill"}>
              {error}
            </Message>
          )}
          {message && (
            <Message variation={"p-3 mb-2 bg-light text-success text-center border border-success rounded-pill"}>
              {message}
            </Message>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={(values, { resetForm, error }) => {
              console.log(values);
              handleSubmitForm(values, resetForm, error);
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
                  <i className="fa fa-user-circle text-light py-3" style={{fontSize: "5rem"}}></i>
                  <h1 className="mb-4">Register </h1>
                  <Form onSubmit={handleSubmit}>
                    <div className="row">
                      <div
                        className={`col-6 form-row ${
                          errors.firstName && touched.firstName
                            ? "input-error"
                            : null
                        }`}
                      >
                        <label htmlFor="firstName " className="form-label">
                          FirstName
                        </label>
                        <Field
                          type="string"
                          name="firstName"
                          id="firstName "
                          className={`${
                            errors.firstName && touched.firstName
                              ? "input-error"
                              : null
                          } form-control`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="error"
                        />
                      </div>
                      <div
                        className={`col-6 form-row ${
                          errors.lastName && touched.lastName
                            ? "input-error"
                            : null
                        }`}
                      >
                        <label htmlFor="lastName" className="form-label">
                          LastName
                        </label>
                        <Field
                          type="string"
                          name="lastName"
                          id="lastName "
                          className={`${
                            errors.lastName && touched.lastName
                              ? "input-error"
                              : null
                          } form-control`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="error"
                        />
                      </div>
                    </div>
                    <div
                      className={`form-row ${
                        errors.email && touched.email ? "input-error" : null
                      }`}
                    >
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`${
                          errors.email && touched.email ? "input-error" : null
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

                    <div
                      className={`form-row ${
                        errors.password && touched.password
                          ? "input-error"
                          : null
                      }`}
                    >
                      <label htmlFor="password" className="form-label">
                        Password
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
                        errors.passwordConfirmation && touched.passwordConfirmation
                          ? "input-error"
                          : null
                      }`}
                    >
                      <label htmlFor="passwordConfirmation" className="form-label">
                      Password Confirmation
                      </label>
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        className={`${
                          errors.passwordConfirmation && touched.passwordConfirmation
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
                        Sign Up
                      </button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
          <div className="py-2" style={{ color: "crimson" }}>
            Or sign up with
          </div>

          <div className="col mb-3">
            <a href="/api/v1/auth/google" className="google btn">
              <i className="fa-brands fa-google-plus-g"></i> Sign Up with
              Google+
            </a>
          </div>

          <div className="row g-1">
            <div className="col-md-8">
              Have account? <Link to={"/login"} style={{color: "#fff"}}>Login</Link>
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  );
};

export default Register;
