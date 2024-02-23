"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Checkbox, TextField } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRouter } from "next/navigation";
import {getEvents} from "./events";

const calendar = ({ session }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents(session));
  }, []);
  return (
    <main className="h-screen justify-center items-center bg-slate-50 flex flex-col px-5">
      <h1 className="text-blue-600 text-center text-3xl leading-[93.75%] tracking-[2px] self-center mt-30 max-md:mt-10">
        Calendar
      </h1>
      <container className="text-black shadow-[0px_60px_120px_0px_rgba(38,51,77,0.05)] bg-white self-center w-full max-w-[1600px] flex flex-col mt-6 mb-48 pt-12 pb-28 px-5 rounded-3xl max-md:mb-10">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventSources={null}
        />
      </container>
    </main>
  );
};

export default calendar;
