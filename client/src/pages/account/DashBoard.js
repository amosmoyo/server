import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row, Image, ListGroup } from "react-bootstrap";
import "./dashboard.css";
import { uploadAvatar, getProfile, updateUser } from "../../redux/action/index";
import Loader from "../../components/Loading";
import Message from "../../components/Message";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editName, setEditName] = useState(false);

  const dispatch = useDispatch();
  const {
    isLogged,
    user,
    loading: authLoading,
    message: authMessage,
  } = useSelector((state) => state.authReducers);

  const [img, setImage] = useState(null);

  const navigete = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigete("/login");
    }
    dispatch(getProfile());
  }, [isLogged, navigete, dispatch, authLoading]);

  // update user image
  const onChangeAvatar = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    setLoading(true);

    if (!file) {
      setMessage("Choose a file");
    } else if (
      (file.type !== "image/jpeg" ||
        file.type !== "image/png" ||
        file.type !== "image/jpg" ||
        file.type !== "image/webp") === false
    ) {
      setMessage("Incorrect file format");
    } else {
      setMessage(null);
      const formdata = new FormData();

      formdata.append("file", file);

      const res = await dispatch(uploadAvatar(formdata));

      if (res._id) {
        setLoading(false);
        setImage(res?.avatar);
      }
    }
  };


  // Edit user details 
  const initialValues = {
    firstName: "",
    lastName: "",
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
  });

  const handleEdit = async (values) => {
    let editData;

    setEditLoading(true);

    if (values.firstName) {
      let name = `${values.firstName} ${values.lastName}`;
      editData = {
        name,
      };

      const res = await dispatch(updateUser(editData));

      if (res._id) {
        setEditName(false);
        setEditLoading(false);
      }
    }
  };

  return (
    <div>
      <Row>
        <Col md={4} style={{ backgroundColor: "#fff" }}>
          <div>
            {user && (
              <>
              <div>
                <p className="text-center fs-4 fw-bold font-monospace">Profile</p>
              </div>
                <div>
                  {loading || authLoading ? (
                    <Loader />
                  ) : (
                    <div className="avatar">
                      <Image
                        src={img === null ? user?.avatar : img}
                        className="image"
                      />
                      <span>
                        <i className="fas fa-camera"></i>
                        <p>change</p>
                        <input
                          type="file"
                          name="file"
                          id="file_up "
                          style={{
                            position: "absolute",
                            top: "0",
                            left: 0,
                            cursor: "pointer",
                            opacity: 0,
                          }}
                          onChange={onChangeAvatar}
                        />
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <ListGroup variant="flush">
                    {editName === false ? (
                      <ListGroup.Item className="d-flex justify-content-between">
                        <p className="fw-bold">{user.name}</p>
                        <i
                          className="fas fa-edit fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setEditName(true);
                          }}
                        ></i>
                      </ListGroup.Item>
                    ) : (
                      <ListGroup.Item>
                        {authLoading || editLoading ? (
                          <Loader />
                        ) : (
                          <Formik
                            initialValues={initialValues}
                            validationSchema={signUpSchema}
                            onSubmit={(values, { resetForm, error }) => {
                              handleEdit(values, resetForm, error);
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
                                <Form onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div
                                      className={`col-6 form-row ${
                                        errors.firstName && touched.firstName
                                          ? "input-error"
                                          : null
                                      }`}
                                    >
                                      <label
                                        htmlFor="firstName "
                                        className="form-label"
                                      >
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
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
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

                                  <div className="d-grid gap-2 col-6 mx-auto">
                                    <button
                                      type="submit"
                                      className={`mt-3 btn btn-primary`}
                                      disabled={!(dirty && isValid)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        )}
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <p className="fw-bold">{user.email}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col md={8}>DashBoard</Col>
      </Row>
    </div>
  );
};

export default DashBoard;
