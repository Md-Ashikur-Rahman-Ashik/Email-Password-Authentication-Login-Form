const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("Form Submitting")
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("The email is:", email);
    console.log("The password is:", password);
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
          />
          <br />
          <input
            className="mb-4 w-3/4 py-2 px-4"
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          <input
            className="mb-4 btn btn-secondary text-white w-3/4"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
