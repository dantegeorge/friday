"use client";
import { Button, Checkbox, TextField } from "@mui/material";
import SigninForm from "./signin/page";
import {
  createClientComponentClient,
  useSession,
} from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  return (
    <div>
      <SigninForm />
    </div>
  );
}
