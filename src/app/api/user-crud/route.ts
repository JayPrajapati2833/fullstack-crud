import { NextResponse } from "next/server";
import axios from "axios";
export async function PUT(req: Request) {
  try {
    const { id, ...userdata } = await req.json(); //Aa js obj. ma convert karse,nahi ke "JSON" ma.
    // console.log("Yaar data", mydata);
    const ans = await axios.put(
      `https://66cec214901aab24841f6d28.mockapi.io/userdata/usersdetails/${id}`,
      userdata
    );
    console.log("My data", ans);
    return NextResponse.json(ans.data);
  } catch (err) {
    console.log("Err. from PUT Req.", err);

    return NextResponse.json(
      { err: "Failed to parse my json" },
      { status: 400 }
    );
  }
}
export async function GET(request: Request) {
  try {
    const response = await axios.get(
      "https://66cec214901aab24841f6d28.mockapi.io/userdata/usersdetails"
    );
    const data = await response.data;

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ err: "Error occured in Get Request!!" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userdata = await req.json();
    const response = await axios.post(
      "https://66cec214901aab24841f6d28.mockapi.io/userdata/usersdetails",
      userdata
    );
    console.log("Resp from POST", response);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ err: "Error from POST" });
  }
}
export async function DELETE(req: Request) {
  try {
    const { currentId } = await req.json();
    const response = await axios.delete(
      `https://66cec214901aab24841f6d28.mockapi.io/userdata/usersdetails/${currentId}`
    );
    console.log("MY Resp", response);
    return NextResponse.json(response.data);
  } catch (err) {
    console.log("Err getting from Delete", err);
    // return NextResponse.json({ err: "Failed to delete" }, { status: 400 });
  }
}
