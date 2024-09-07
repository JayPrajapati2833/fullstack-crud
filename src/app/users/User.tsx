"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface UserData {
  id: number;
  fname: string;
  lname: string;
  email: string;
  mobileNo: number;
}
const Users = () => {
  const [userData, setuserData]: any = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("api/user-crud")
      .then((resp) => {
        console.log("Response", resp.data);
        setuserData(resp.data);
      })
      .catch((err) => {
        console.log("Error from Get", err);
      });
  }, []);

  const handletoEdit = (id: any) => {
    console.log("Id is", typeof id);
    router.push(`/edit/${id}`);
  };
  const handletoDelete = (currentId: any) => {
    console.log("Id Is", typeof currentId);

    axios
      .delete(`api/user-crud`, { data: { currentId } })
      .then((res) => {
        console.log("Resp from Delete", res);
        const filteredData = userData?.filter(
          (data: any) => data?.id !== currentId
        );
        setuserData(filteredData);
      })
      .catch((err) => {
        console.log("Err from Delete", err);
      });
  };
  return (
    <div>
      <button
        onClick={() => router.push("/addusers")}
        style={{ marginLeft: "600px" }}
      >
        Add User
      </button>
      <br />
      <br />
      
      <table border={1} style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((data: any) => {
            return (
              <tr key={data?.id}>
                <td>{data?.fname}</td>
                <td>{data?.lname}</td>
                <td>{data?.email}</td>
                <td>{data?.mobileNo}</td>
                <td>
                  <button onClick={() => handletoEdit(data?.id)}>Edit</button>
                  &nbsp;
                  <button onClick={() => handletoDelete(data?.id)}>
                    Delete
                  </button>
                  &nbsp;
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
