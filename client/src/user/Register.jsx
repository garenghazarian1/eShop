import { useUserContext } from "../context/userContext.jsx";
import {inputField, label, button} from "../css/style.jsx"

export default function Register() {
  const { handleUserRegisterSubmit,handleUserProfileImage,  name, setName, age, setAge, email, setEmail, password, setPassword, previewUrl} = useUserContext();

  return (
    // USER REGISTER FORM *************************************************
    <form className="flex flex-col gap-2 space-y-4 mt-4" onSubmit={handleUserRegisterSubmit}>
      <div>

        {/*  USERNAME LABEL AND INPUT FIELD******************************************** */}
        <label htmlFor="username" className={label}>Client Username</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className={inputField}
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/*  AGE LABEL AND INPUT FIELD******************************************** */}
      <div>
        <label htmlFor="age" className={label}>Age</label>
        <input
          type="number"
          name="age"
          id="age"
          className={inputField}
          placeholder="Your age..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      {/*  EMAIL LABEL AND INPUT FIELD******************************************** */}
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Your email address..."
          className={inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/*  PASSWORD LABEL AND INPUT FIELD******************************************** */}
      <div>
        <label htmlFor="password" className={label}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={inputField}
          placeholder="Choose a password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      {/*  IMAGE LABEL AND INPUT FIELD******************************************** */}
      <div>
      <div className="flex items-center justify-start ml-4">
        <label className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-700">
          Add Profile Image
          <input
            type="file"
            hidden
            onChange={handleUserProfileImage}
            accept="image/*"
          />
        </label>
      </div>
      {previewUrl && (
        <img src={previewUrl} alt="Profile preview" className="h-24 rounded-full" />

      )}
    </div>
    {/*   SUBMIT BUTTON ******************************************** */}
      <div className='pl-4'>
        <button
          type="submit"
          className={button}
        >
          Register
        </button>
      </div>
    </form>
  );
}
