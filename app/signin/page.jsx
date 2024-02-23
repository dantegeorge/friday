"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Checkbox, TextField } from "@mui/material";

const supabase = createClientComponentClient();

async function googleSignIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/calendar",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    alert("Error logging into google provider with Supabase");
  }
}

async function signOut() {
  await supabase.auth.signOut();
}

const SigninForm = () => {
  return (
    <main className="h-screen justify-center items-center bg-slate-50 flex flex-col px-5">
      <h1 className="text-blue-600 text-center text-3xl leading-[93.75%] tracking-[2px] self-center mt-60 max-md:mt-10">
        Friday
      </h1>
      <container className=" shadow-[0px_60px_120px_0px_rgba(38,51,77,0.05)] bg-white self-center w-full max-w-[548px] flex flex-col mt-6 mb-48 pt-12 pb-28 px-5 rounded-3xl max-md:mb-10">
        <div className="self-center flex w-[400px] flex-col -mb-6 max-md:mb-2.5">
          <Button
            className="justify-center items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] hover:bg-red-400 bg-red-500 text-white w-full self-stretch flex flex-col px-3 py-3.5 rounded-xl max-md:mr-1.5"
            onClick={() => googleSignIn()}
          >
            G Sign in with Google
          </Button>
          <TextField
            type="text"
            id="username"
            className="justify-center rounded border self-stretch flex w-full flex-col mt-7 px-0 py-3.5 border-solid max-md:ml-1.5"
            placeholder="Username"
            required
          />
          <TextField
            type="password"
            id="password"
            className="justify-center rounded border self-stretch flex w-full flex-col mt-3.5 px-0 py-3.5 border-solid max-md:ml-1.5"
            placeholder="Password"
            required
          />
          <Checkbox
            id="remember-me"
            className="rounded border border-[color:var(--Black-20,rgba(17,17,19,0.20))] self-stretch flex w-[18px] h-[18px] flex-col border-solid"
          />
          <label htmlFor="remember-me" className="text-black text-sm">
            Remember me
          </label>
          <Button
            type="submit"
            className="justify-center items-center hover:bg-blue-500 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-blue-600 w-full self-stretch flex flex-col px-3 py-3.5 rounded-xl max-md:mr-1.5"
            onClick={null}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            className="justify-center items-center hover:bg-blue-500 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-blue-600 w-full self-stretch flex flex-col px-3 py-3.5 rounded-xl max-md:mr-1.5"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
          <p className="mt-3.5 text-center text-black">
            Not a member?{" "}
            <a href="#" className="text-blue-600">
              Create an account
            </a>
          </p>
        </div>
      </container>
    </main>
  );
};

export default SigninForm;
