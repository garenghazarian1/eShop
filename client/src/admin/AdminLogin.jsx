import {useAdminContext}  from "../context/adminContext.jsx"
import {inputField, label, button} from "../css/style.jsx"

export default function Login() {

  const {handleAdminLoginSubmit, email, setEmail, password, setPassword, loginError} = useAdminContext();

  return (
    <form className="flex flex-col gap-2 space-y-4 mt-4"
    onSubmit={handleAdminLoginSubmit}>
      {loginError && <div className="pl-4 text-red-500">{loginError}</div>}
      <div>
        <label htmlFor="email" className={label}>Admin Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          className={inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className={label}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value) }
        />
      </div>
      <div className='pl-4'>
        <button type="submit" className={button}>
          Login
        </button>
      </div>
    </form>
  );
}
