import { useState } from "react";
import { NETFLIX_HERO_BG } from "../Utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatchAction = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("Required"),
    ...(isSignUp && {
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { name, email, password } = values;

      setLoading(true);

      if (isSignUp) {
        // Sign up logic
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            return updateProfile(auth.currentUser, {
              displayName: name,
            });
          })
          .then(() => {
            // Update the Redux store with the new user information
            dispatchAction(
              addUser({
                uid: auth.currentUser.uid,
                displayName: name,
                email: auth.currentUser.email,
              })
            );
            setSignUpError(null);
            formik.resetForm();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSignUpError(errorCode + ": " + errorMessage);
          })
          .finally(() => {
            setLoading(false); // Always set loading to false at the end of the async operation
          });
      } else {
        // Sign in logic
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            console.log(userCredential.user);
            setSignUpError(null);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSignUpError(errorCode + ": " + errorMessage);
          })
          .finally(() => {
            setLoading(false); // Always set loading to false at the end of the async operation
          });
      }
    },
  });

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    formik.resetForm();
    setSignUpError(null);
  };

  return (
    <>
      <div className="relative h-screen w-full">
        <img
          className="absolute h-full w-full object-cover"
          src={NETFLIX_HERO_BG}
          alt="BG"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex justify-center items-center h-full">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-black bg-opacity-75 p-10 rounded-lg md:w-96 w-[90%]"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {!isSignUp ? "Sign In" : "Sign Up"}
            </h2>
            {isSignUp && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-800 text-white w-full h-12 p-3 rounded"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 mt-2 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-800 text-white w-full h-12 p-3 rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 mt-2 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-4 relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-800 text-white w-full h-12 p-3 rounded pr-12"
              />
              <button
                type="button"
                onClick={showPassword}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {isShowPassword ? (
                  <FaRegEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 mt-2 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            {signUpError ? (
              <div className="text-red-500 mt-2 text-sm">{signUpError}</div>
            ) : null}
            <button
              type="submit"
              className="bg-red-600 text-white w-full h-12 rounded my-2"
              disabled={loading}
            >
              {isSignUp && loading
                ? "Signing Up..."
                : !isSignUp && loading
                ? "Signing In..."
                : !isSignUp
                ? "Sign In"
                : "Sign Up"}
            </button>

            <p className="text-gray-500 mt-8 select-none">
              {isSignUp ? "Already have an account? " : "New to CineBot? "}
              <span
                className="text-white cursor-pointer"
                onClick={toggleSignUp}
              >
                {isSignUp ? "Sign In Now" : "Sign Up Now"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
