function RegisterPage() {
  return (
    <div>
      <form action="">
        <input type="text" placeholder="username" name="username" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input
          type="password"
          placeholder="password again"
          name="passwordRepeat"
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
