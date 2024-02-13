
import {useAdminContext}  from "../context/adminContext.jsx"
import {inputField, label, button} from "../css/style.jsx"

export default function Register() {

  const {handleAdminRegisterSubmit, name, setName, age, setAge, email, setEmail, password, setPassword} = useAdminContext();

  return (
    <form className=" flex flex-col gap-2 space-y-4 mt-4"
    onSubmit={handleAdminRegisterSubmit}>
      <div>
        <label htmlFor="username" className={label}>Admin Name</label>
        <input type="text"
          name="name"
          id="name"
          required
          className={inputField}
          placeholder=" Your name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="age" className={label}>Age</label>
        <input
          type="number"
          name="age"
          id="age"
          className={inputField}
          placeholder=" Your age..."
          value={age} onChange={e => setAge(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder=" Your email address..."
          className={inputField}
          value={email} onChange={e => setEmail(e.target.value)}
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
          placeholder=" Choose a password..."
          value={password} onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='pl-4'>
        <button type="submit" className={button}>
          Register
        </button>
      </div>
    </form>
  );
}
