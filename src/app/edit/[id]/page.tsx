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

  const [userData, setUserData] = useState<Userdata | null>();
  useEffect(() => {
    axios
      .get("/api/user-crud")
      .then((res) => {
        const data = res.data;
        const currentData = data?.find((data: any) => data?.id === id);
        console.log("From data", currentData);
        setUserData(currentData || null);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);
  const handletoClick = async () => {
    console.log("Clicked", userData);

    await axios
      .put(`/api/user-crud`, userData)
      .then((res) => {
        console.log("Res from post", res);
        router.push("/users");
      })
      .catch((err) => {
        console.log("Err from post", err);
      });
  };

  const handletoChange = (e: any) => {
    if (userData) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      First Name:
      <input
        type="text"
        onChange={(e) => handletoChange(e)}
        name="fname"
        value={userData?.fname || ""}
      />
      <br />
      <br />
      Last Name:{" "}
      <input
        type="text"
        name="lname"
        onChange={(e) => handletoChange(e)}
        value={userData?.lname || ""}
      />
      <br />
      <br />
      Email Id:{" "}
      <input
        type="email"
        name="email"
        onChange={(e) => handletoChange(e)}
        value={userData?.email || ""}
      />
      <br />
      <br />
      Mobile Number:{" "}
      <input
        type="number"
        name="mobileNo"
        onChange={(e) => handletoChange(e)}
        value={userData?.mobileNo || ""}
      />
      <br />
      <br />
      <button onClick={() => handletoClick()}>Edit</button>
    </div>
  );
};

export default EditData;
