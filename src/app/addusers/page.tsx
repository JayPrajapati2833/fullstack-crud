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
  const [userData, setUserData] = useState<Userdata>({
    fname: "",
    lname: "",
    email: "",
    mobileNo: "",
    password: "",
  });
  const router = useRouter();
  const [isFilled, setIsFilled] = useState(false);
  const [validationOfPhone, setValidationOfPhone] = useState<string>("");
  const [validationOfEmail, setValidationOfEmail] = useState<string>("");

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name === "email") {
      if (value.trim() === "") {
        setValidationOfEmail("Email is required");
      } else if (!emailRegEx.test(value)) {
        setValidationOfEmail("Email ID is not valid!");
      } else {
        setValidationOfEmail("");
      }
    }

    if (name === "mobileNo") {
      const digitOnlyValue = value.replace(/[^0-9]/g, "");

      if (digitOnlyValue.length === 0) {
        setValidationOfPhone("Phone number is required");
      } else if (digitOnlyValue.length < 10) {
        setValidationOfPhone("Phone number must be exactly 10 digits");
      } else if (digitOnlyValue.length > 10) {
        setValidationOfPhone("Phone number must be exactly 10 digits");
      } else {
        setValidationOfPhone("");
      }

      setUserData({ ...userData, [name]: digitOnlyValue });
      return;
    }

    setUserData({ ...userData, [name]: value });
  };

  const handleToClick = () => {
    setIsFilled(true);

    if (
      userData.fname &&
      userData.lname &&
      userData.email &&
      userData.mobileNo.length === 10 &&
      userData.password &&
      !validationOfEmail &&
      !validationOfPhone
    ) {
      axios
        .post("/api/user-crud", userData)
        .then((res) => {
          console.log("Response from Post", res);
          alert(`${userData.fname}'s details added successfully!`);
          router.push("/users");
        })
        .catch((err) => {
          console.log("Error from Post", err);
        });
    } else {
      alert("Please fill out the form completely and correctly!");
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <label>
          Enter First Name:
          <input
            type="text"
            onChange={handleToChange}
            name="fname"
            value={userData.fname}
          />
        </label>
        <br />
        {isFilled && !userData.fname && (
          <span style={{ color: "red" }}>First name is required</span>
        )}
        <br />

        <label>
          Enter Last Name:
          <input
            type="text"
            name="lname"
            onChange={handleToChange}
            value={userData.lname}
          />
        </label>
        <br />
        {isFilled && !userData.lname && (
          <span style={{ color: "red" }}>Last name is required</span>
        )}
        <br />

        <label>
          Enter Email Id:
          <input
            type="email"
            name="email"
            onChange={handleToChange}
            value={userData.email}
          />
        </label>
        <br />
        {isFilled && !userData.email && (
          <span style={{ color: "red" }}>Email is required</span>
        )}
        {isFilled && validationOfEmail && (
          <span style={{ color: "red" }}>{validationOfEmail}</span>
        )}
        <br />

        <label>
          Enter Mobile Number:
          <input
            type="text"
            name="mobileNo"
            onChange={handleToChange}
            value={userData.mobileNo}
          />
        </label>
        <br />
        {isFilled && !userData.mobileNo && (
          <span style={{ color: "red" }}>Phone number is required</span>
        )}
        {isFilled && validationOfPhone && (
          <span style={{ color: "red" }}>{validationOfPhone}</span>
        )}
        <br />

        <label>
          Enter your Password:
          <input
            type="password"
            name="password"
            onChange={handleToChange}
            value={userData.password}
          />
        </label>
        <br />
        {isFilled && !userData.password && (
          <span style={{ color: "red" }}>Password is required</span>
        )}
        <br />

        <button onClick={handleToClick}>Submit</button>
      </div>
    </main>
  );
}
