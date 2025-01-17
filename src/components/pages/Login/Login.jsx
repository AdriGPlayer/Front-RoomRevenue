import "../../styles/Login.css";

export default function Login() {
  return (
    <div className="container-login">
      <div className="card">
        <a className="singup">RoomRevenue</a>
        <p className="singup">Login</p>

        <form action="">
          <div className="inputBox">
            <input type="text" required="true" name="usuario" />
            <span>Username</span>
          </div>

          <div className="inputBox">
            <input type="password" required="true" name="password" />
            <span>Password</span>
          </div>

          <button type="submit" className="enter">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
