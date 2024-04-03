import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Reset Error
    setSuccess("");
    setRegisterError("");
    // console.log("Form Submitting")
    const email = e.target.email.value;
    const password = e.target.password.value;

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
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
          />
          <br />
          <div>
            <input
              className="mb-4 w-3/4 py-2 px-4"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <span onClick={handleShowPassword} className="cursor-pointer">
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <input
            className="mb-4 btn btn-secondary text-white w-3/4"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-400">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
