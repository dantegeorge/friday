import { Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const signOutButton = () => {
  const router = useRouter();
  return (
    <container className=" shadow-[0px_60px_120px_0px_rgba(38,51,77,0.05)] bg-white self-center w-full max-w-[700px] flex flex-col mt-6 mb-48 pt-12 pb-28 px-5 rounded-3xl max-md:mb-10">
      <Button
        type="submit"
        className="justify-center items-center hover:bg-blue-500 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-blue-600 w-full self-stretch flex flex-col px-3 py-3.5 rounded-xl max-md:mr-1.5"
        onClick={router.push("/auth/signout")}
      >
        Sign out
      </Button>
    </container>
  );
};

export default signOutButton;
