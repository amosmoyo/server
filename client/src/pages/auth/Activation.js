import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activationEmail } from "../../redux/action/index";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loading";
import Message from "../../components/Message";

const Activation = () => {
  const navigate = useNavigate();
  const { activation_token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {
    const getActivation = async () => {
      if (activation_token) {
        await dispatch(activationEmail(activation_token));
      }
    };

    getActivation();
  }, [dispatch, activation_token]);

  return (
    <>
      <FormContainer>
        {/* {message && (
          <Message
            variation={
              "p-3 mb-2 bg-success text-white text-center border border-danger rounded-pill"
            }
          >
            {message}
          </Message>
        )} */}

        {loading ? (
          <Loader />
        ) : (
          <>
            {message ? (
              <Message
                variation={
                  "p-3 mb-2 bg-success text-white text-center border border-danger rounded-pill"
                }
              >
                {message}
              </Message>
            ) : (
              <Message
                variation={
                  "p-3 mb-2 bg-light text-danger text-center border border-danger rounded-pill"
                }
              >
                {error}
              </Message>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default Activation;
