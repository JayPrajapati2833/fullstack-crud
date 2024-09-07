"use client";
import axios from "axios";
import styles from "../page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Userdata {
  fname: string;
  lname: string;
  email: string;
  mobileNo: string;
  password: string;
}
export default function Home() {
  const [userData, setuserData] = useState<Userdata>({
    fname: "",
    lname: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const router = useRouter();
  const handletoChange = (e: any) => {
    console.log("Changed");
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handletoClick = () => {
    console.log("Clicked", userData);
    axios
      .post("api/user-crud", userData)
      .then((res) => {
        console.log("Resp from Post", res);
        router.push("/users");
      })
      .catch((err) => {
        console.log("Err from Post", err);
      });
  };
  return (
    <main className={styles.main}>
      <div>
        Enter First Name:
        <input
          type="text"
          onChange={(e) => handletoChange(e)}
          name="fname"
          value={userData?.fname}
        />
        <br />
        <br />
        
        Enter Last Name:{" "}
        <input
          type="text"
          name="lname"
          onChange={(e) => handletoChange(e)}
          value={userData?.lname}
        />
        <br />
        <br />
        Enter Email Id:{" "}
        <input
          type="email"
          name="email"
          onChange={(e) => handletoChange(e)}
          value={userData?.email}
        />
        <br />
        <br />
        Enter Mobile Number:{" "}
        <input
          type="number"
          name="mobileNo"
          onChange={(e) => handletoChange(e)}
          value={userData?.mobileNo}
        />
        <br />
        <br />
        Enter your Password:{" "}
        <input
          type="password"
          name="password"
          onChange={(e) => handletoChange(e)}
          value={userData?.password}
        />
        <br />
        <br />
        <button onClick={() => handletoClick()}>Submit</button>
      </div>
    </main>
  );
}
