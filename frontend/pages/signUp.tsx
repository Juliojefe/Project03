import { useState } from "react";
import axios from "axios";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  userType: "regular_user" | "admin" | "mechanic";
  profilePic: string;
}

export default function SignupForm() {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    userType: "regular_user",
    profilePic: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<boolean>("http://localhost:8081/api/user/register", form);
      if (res.data === true) {
        alert("Signup successful");
      } else {
        alert("User already exists");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="profilePic" placeholder="Profile Pic URL" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
