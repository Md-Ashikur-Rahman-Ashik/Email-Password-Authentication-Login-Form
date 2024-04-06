import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptMessage, setAcceptMessage] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Reset Error
    setAcceptMessage("");
    setSuccess("");
    setRegisterError("");
    // console.log("Form Submitting")
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // console.log("The user's name is:", name);

    if (accepted === false) {
      setAcceptMessage("You should accept our terms and conditions");
      return;
    }

    // console.log("The email is:", email);
    // console.log("The password is:", password);

    if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password must contain a Uppercase character");
      return;
    }

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result.user);
        setSuccess("User Registration completed");

        // Update Profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => console.log("Profile Updated"))
          .catch();

        // Send verification E-mail
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
      })
      .catch((error) => {
        console.error(error);
        if (password.length < 6) {
          setRegisterError("Password should be at least 6 characters");
        } else {
          setRegisterError(error.message);
        }
      });
  };

  return (
    <div>
      <div className="mx-auto md:w-1/2">
        <h3 className="text-3xl mb-8">Please Register</h3>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <br />
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
          />
          <br />
          <div className="relative">
            <input
              className="mb-4 w-3/4 py-2 px-4"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <span
              onClick={handleShowPassword}
              className="cursor-pointer absolute right-36 top-2"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              Accept our <a href="">Terms and Conditions</a>
            </label>
          </div>
          <br />
          <input
            className="mb-4 btn btn-secondary text-white w-3/4"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-400">{success}</p>}
        {acceptMessage && <p className="text-red-700">{acceptMessage}</p>}
        <p className="mx-auto">
          Already have an account? Please{" "}
          <Link className="text-purple-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
