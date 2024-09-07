"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Userdata {
  id: string;
  fname: string;
  lname: string;
  email: string;
  mobileNo: string;
}

const EditData = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();

  const [userData, setUserData] = useState<Userdata | null>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [validationOfPhone, setValidationOfPhone] = useState("");
  const [validationOfEmail, setValidationOfEmail] = useState("");

  useEffect(() => {
    axios
      .get("/api/user-crud")
      .then((res) => {
        const data = res.data;
        const currentData = data.find((item: any) => item.id === id);
        setUserData(currentData || null);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id]);

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
      if (value.trim() === "") {
        setValidationOfPhone("Phone number is required");
      } else if (!/^\d{10}$/.test(value)) {
        setValidationOfPhone("Please enter a valid 10-digit phone number!");
      } else {
        setValidationOfPhone("");
      }
    }

    if (userData) {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleToClick = async () => {
    setIsFilled(true);

    if (
      userData?.fname &&
      userData?.lname &&
      userData?.email &&
      userData?.mobileNo &&
      !validationOfEmail &&
      !validationOfPhone
    ) {
      try {
        await axios.put(`/api/user-crud`, userData);
        alert(`${userData.fname}'s details updated successfully!`);
        router.push("/users");
      } catch (err) {
        console.error("Error updating data:", err);
      }
    } else {
      alert("Please fill out the form completely and correctly!");
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <label>
        First Name:
        <input
          type="text"
          onChange={handleToChange}
          name="fname"
          value={userData.fname || ""}
        />
      </label>
      <br />
      {isFilled && !userData.fname && (
        <span style={{ color: "red" }}>First name is required</span>
      )}
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lname"
          onChange={handleToChange}
          value={userData.lname || ""}
        />
      </label>
      <br />
      {isFilled && !userData.lname && (
        <span style={{ color: "red" }}>Last name is required</span>
      )}
      <br />

      <label>
        Email Id:
        <input
          type="email"
          name="email"
          onChange={handleToChange}
          value={userData.email || ""}
        />
      </label>
      <br />
      {validationOfEmail && (
        <span style={{ color: "red" }}>{validationOfEmail}</span>
      )}
      <br />

      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileNo"
          onChange={handleToChange}
          value={userData.mobileNo || ""}
        />
      </label>
      <br />
      {validationOfPhone && (
        <span style={{ color: "red" }}>{validationOfPhone}</span>
      )}
      <br />

      <button onClick={handleToClick}>Edit</button>
    </div>
  );
};

export default EditData;
