"use client";
import * as React from "react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button, TextField } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import moment from "moment";

const supabase = createClientComponentClient();

const timeblockInsert = ({ session }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function closestDate({ dayName }) {
    const currentDay = new Date().getDay();
    const targetDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(dayName);

    let daysToAdd = targetDay - currentDay;
    if (daysToAdd <= 0) {
      daysToAdd += 7; // To get the next occurrence of the day
    }

    const closestDate = new Date();
    closestDate.setDate(closestDate.getDate() + daysToAdd);

    return closestDate.toISOString().split("T")[0];
  }

  async function sendTimeblocks(sections) {
    setLoading(true);
    // Iterate through each section and send events to Google Calendar
    for (const section of sections) {
      const closestDay = closestDate({ dayName: section.day });
      const startTime = section.from.toISOString();
      const startTimeOnly = startTime.split("T")[1].split(".")[0];
      const startDate = closestDay;
      const endTime = section.till.toISOString();
      const endTimeOnly = endTime.split("T")[1].split(".")[0];
      const endDate = closestDay;
      console.log(session);

      const event = {
        summary: section.title,
        description: "Timeblock Created by Friday",
        start: {
          dateTime: `${startDate}T${startTimeOnly}`, // Combine date and time
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: `${endDate}T${endTimeOnly}`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };
      console.log(event);
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token, // Access token for Google
          },
          body: JSON.stringify(event),
        }
      ).then((response) => {
        if (!response.ok) {
          console.error("Failed to create event:", response.statusText);
        } else {
          console.log("Events created successfully!");
          setLoading(false);
          router.push("/calendar");
        }
      });
    }
    // Add logic to handle navigation or any other actions after events are created
  }

  const [sections, setSections] = useState([
    {
      title: "",
      day: "",
      from: null,
      till: null,
    },
  ]);

  const handleChange = (index, field, value) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index][field] = value;
      return newSections;
    });
  };

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        title: "",
        day: "",
        from: null,
        till: null,
      },
    ]);
  };

  return (
    <main className="h-screen justify-center items-center bg-slate-50 flex flex-col px-5">
      <h1 className="text-blue-600 text-center text-3xl leading-[93.75%] tracking-[2px] self-center mt-60 max-md:mt-10">
        Set Up Your TimeBlocks
      </h1>
      <container className=" shadow-[0px_60px_120px_0px_rgba(38,51,77,0.05)] bg-white items-center self-center w-full max-w-[870px] flex flex-col mt-6 mb-48 pt-12 pb-28 px-5 rounded-3xl max-md:mb-10">
        <div className="self-center flex w-full flex-col -mb-6 max-md:mb-2.5 text-black">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {sections.map((section, index) => (
              <div key={index}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TextField
                    id={`outlined-basic-${index}`}
                    label="Timeblock Name"
                    variant="outlined"
                    value={section.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                  />
                  <FormControl fullWidth>
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                      Day
                    </InputLabel>
                    <Select
                      labelId={`demo-simple-select-label-${index}`}
                      id={`demo-simple-select-${index}`}
                      value={section.day}
                      label="Day"
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                    >
                      <MenuItem value={"Monday"}>Monday</MenuItem>
                      <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                      <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                      <MenuItem value={"Thursday"}>Thursday</MenuItem>
                      <MenuItem value={"Friday"}>Friday</MenuItem>
                      <MenuItem value={"Saturday"}>Saturday</MenuItem>
                      <MenuItem value={"Sunday"}>Sunday</MenuItem>
                    </Select>
                  </FormControl>
                  <TimePicker
                    label="From?"
                    value={section.from}
                    onChange={(newValue) =>
                      handleChange(index, "from", newValue)
                    }
                  />
                  <TimePicker
                    label="Till?"
                    value={section.till}
                    onChange={(newValue) =>
                      handleChange(index, "till", newValue)
                    }
                  />
                </DemoContainer>
              </div>
            ))}
            {!loading && (
              <Button className="mt-6" onClick={addSection}>
                Add Section
              </Button>
            )}
          </LocalizationProvider>
          {!loading && (
            <Button
              type="submit"
              className="mt-6 justify-center items-center hover:bg-blue-500 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] bg-blue-600 w-full self-stretch flex flex-col px-3 py-3.5 rounded-xl max-md:mr-1.5 "
              onClick={() => sendTimeblocks(sections)}
            >
              Save Timeblocks
            </Button>
          )}
          {loading && <CircularProgress className="self-center" />}
        </div>
      </container>
    </main>
  );
};

export default timeblockInsert;
