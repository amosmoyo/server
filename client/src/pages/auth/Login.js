import React from "react";
import FormContainer from "../../components/FormContainer";
import "./auth.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Loading";
import Message from "../../components/Message";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLogged, error, loading } = useSelector(
    (state) => state.authReducers
  );

  React.useEffect(() => {
    if (isLogged) {
      navigate("/account");
    }
  }, [isLogged, navigate, loading]);

  const initialValues = {
    email: "",
    password: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 4 chars minimum"),
  });

  const handleSubmitForm = (values, resetForm, error) => {
    let loginData;

    if (values.email && values.password) {
      loginData = {
        email: values.email,
        password: values.password,
      };

      dispatch(login(loginData));
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
          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={(values, { resetForm, error }) => {
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
                  <h1>Login</h1>
                  <Form onSubmit={handleSubmit}>
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
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        type="submit"
                        className={`mt-3 btn btn-primary`}
                        disabled={!(dirty && isValid)}
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
          <div className="py-2" style={{ color: "crimson" }}>
            Or Login with
          </div>

          <div className="col mb-3">
            <a href="/api/v1/auth/google" className="google btn">
              <i className="fa-brands fa-google-plus-g"></i> Login with Google+
            </a>
          </div>

          <div className="row g-1">
            <div className="col-4 text-white">
              <Link to={"/register"} style={{color: "#fff"}}>Register</Link>
            </div>

            <div className="col-8">
              <Link to={"/forgetpassword"} style={{color: "#fff"}}>Forgot your password?</Link>
            </div>
          </div>
        </div>
      )}
    </FormContainer>
  );
};

export default Login;
