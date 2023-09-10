"use client";

import React, { useRef } from "react";
import photo from "../../../../public/images/dashboard/sagittarius.png";
import Image from "next/image";
import left from "../../../../public/images/dashboard/left-arrow.svg";
import Link from "next/link";
import bell from "../../../../public/images/dashboard/bell.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState, useEffect } from "react";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { Toaster, toast } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PreviousOrdersPage = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

const [selectedDate, setSelectedDate] = useState(null);
const [selectedMonth, setSelectedMonth] = useState(null);


  const [isScrolling, setIsScrolling] = useState(false);
  let firstDayOfCurrentMonth = startOfMonth(
    parse(currentMonth, "MMM-yyyy", new Date())
  );
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  }).map((date) => ({
    date,
  }));

  useEffect(() => {
    const now = new Date();
    setSelectedHour(now.getHours());
    setSelectedMinute(now.getMinutes());
  }, []);

  function next() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  function previous() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    setSelectedHour(7); // Set default hour to 7
    setSelectedMinute(0); // Set default minute to 0
  }, []);

  const handleScroll = (e, isHour) => {
    setIsScrolling(true);
    const scrollAmount = e.nativeEvent.deltaY;
    const delay = 100;

    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (isHour) {
        setSelectedHour((prevHour) => {
          const newHour = prevHour + (scrollAmount > 0 ? 1 : -1);

          if (newHour === 19 && selectedMinute === 30) {
            setSelectedMinute(0);
          } else if (newHour === 7 && selectedMinute === 30) {
            setSelectedMinute(0);
          }

          return Math.max(7, Math.min(19, newHour));
        });
      } else {
        setSelectedMinute((prevMinute) => {
          if (selectedHour === 19 && scrollAmount > 0) {
            return prevMinute;
          }
          const newMinute = prevMinute + (scrollAmount > 0 ? 30 : -30);
          if (newMinute < 0) {
            setSelectedHour((prevHour) => Math.max(7, prevHour - 1));
            return 30;
          } else if (newMinute > 59) {
            setSelectedHour((prevHour) => Math.min(19, prevHour + 1));
            return 0;
          } else {
            return newMinute;
          }
        });
      }
      setIsScrolling(false);
    }, delay);
  };

  const handleTimeSelection = () => {
    const selectedTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    console.log("Selected Time:", selectedTime);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedDay);
    console.log(selectedMonth);
    console.log(selectedHour);
    console.log(selectedMinute)
    console.log(selectedOptions)
    toast.success("Cart Items Added.", {
      style: {
        border: "2px solid rgba(255, 255, 255, 0.1)",
        padding: "16px",
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      },
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
  };

  return (
    <div className="lg:flex panel scroll overscroll-none lg:h-full py-5">
      {/* Sidebar */}
      {isAboveSmallScreens ? (
      <div className="w-60 border-r-2 flex justify-center phone:pt-5 lg:pt-8 border-white/10">
        <div className="text-white mb-4">
          <Link href="/admin/home" className="flex mb-5">
            <Image src={left} alt="" className="phone:w-8 phone:h-8 lg:w-12 lg:h-12 phone:my-auto mx-auto mb-10" />
          </Link>
          <Image
            src={photo}
            alt="Profile"
            className="phone:w-10 phone:h-10 lg:w-16 lg:h-16 rounded-full border-2 border-white/20 mx-auto phone:my-auto"
          />
          <p className="text-white/30 font-roxale mt-1 text-center">
            @johndoe
          </p>
          <div>
            <p className="font-roxale mt-5 text-lg text-center">
              John Doe
            </p>
          </div>
        </div>
      </div>) : (<></>)}

      {/* Main */}
      <div className="w-full">
        <div className="flex justify-between border-b-2 border-white/10 p-5">
          <h2 className="phone:text-xl lg:text-3xl font-roxale text-white my-auto">
            Book A Date & Time
          </h2>
          <Link href="/admin/notifications">
            <Image src={bell} alt="" className="phone:w-7 phone:h-7 lg:w-10 lg:h-10 my-auto" />
          </Link>
        </div>

        {/* Calender and Time Picker */}
        <div className="mt-10 lg:grid grid-cols-[2fr_1.5fr_1fr]">
          {/* Calender */}
          <div className="font-roxale panel scroll border-r-2 border-white/10">
            <div className="w-full px-2 mx-auto">
              <div className="flex items-center px-5">
                <h2 className="flex-auto font-semibold text-white font-roxale phone:text-xl lg:text-3xl">
                  {format(firstDayOfCurrentMonth, "MMMM yyyy")}
                </h2>

                <button
                  onClick={previous}
                  type="button"
                  className="-my-1.5 flex flex-none items-center justify-center p-3 text-white hover:bg-black/40 rounded-full transition duration-500 ease-in-out"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="phone:w-6 phone:h-6 lg:w-8 lg:h-8" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  type="button"
                  className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-3 text-white hover:bg-black/40 rounded-full transition duration-500 ease-in-out"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="phone:w-6 phone:h-6 lg:w-8 lg:h-8" aria-hidden="true" />
                </button>
              </div>
              <div className="flex text-gray-100 justify-between mt-8 lg:px-5">
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  S
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  M
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  T
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  W
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  T
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  F
                </div>
                <div className="border border-white/10 rounded-full phone:w-12 phone:h-12 lg:w-16 lg:h-16 flex items-center justify-center text-lg">
                  S
                </div>
              </div>
              <div className="grid grid-cols-7 mt-2">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.date}
                    className={classNames(
                      // dayIdx > 6 && 'border-t border-gray-200',
                      dayIdx === 0 && colStartClasses[getDay(day.date)],
                      "pb-2 pt-4 text-neutral-500 text-lg"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day.date)}
                      className={classNames(
                        isEqual(day.date, selectedDay) && "text-white text-lg",
                        !isEqual(day.date, selectedDay) &&
                          isEqual(day.date, today) &&
                          "text-red-500 text-lg",
                        !isEqual(day.date, firstDayOfCurrentMonth) &&
                          !isEqual(day.date, today) &&
                          isSameMonth(
                            day.date,
                            startOfMonth(firstDayOfCurrentMonth)
                          ) &&
                          "text-white/80 text-lg",
                        !isEqual(day.date, firstDayOfCurrentMonth) &&
                          !isEqual(day.date, today) &&
                          !isSameMonth(
                            day.date,
                            startOfMonth(firstDayOfCurrentMonth)
                          ) &&
                          "text-white/20 text-lg",
                        isEqual(day.date, selectedDay) &&
                          isEqual(day.date, today) &&
                          "bg-black/20 border border-white/10",
                        isEqual(day.date, selectedDay) &&
                          !isEqual(day.date, today) &&
                          "bg-black",
                        !isEqual(day.date, selectedDay) && "hover:bg-white/10",
                        (isEqual(day.date, selectedDay) ||
                          isEqual(day.date, today)) &&
                          "",
                        "mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={day.date}>{format(day.date, "d")}</time>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="my-auto flex flex-col items-center justify-center phone:mb-12 lg:mb-0 lg:mt-0 phone:bg-white/5 lg:bg-transparent lg:border-0 ">
            <div className="flex justify-center items-center text-white/90 font-technology">
              <div className="phone:text-[9rem] lg:text-[12rem] text-right" onWheel={(e) => handleScroll(e, true)}>
                {selectedHour.toString().padStart(2, '0')}
              </div>
              <p className="text-[12rem] text-white/90 mx-5">:</p>
              <div className="phone:text-[9rem] lg:text-[12rem] text-left" onWheel={(e) => handleScroll(e, false)}>
                {selectedMinute.toString().padStart(2, '0')}
              </div>
            </div>
            <p className="font-technology text-white text-2xl text-center">Scroll up and down on the time</p>
            <button
              onClick={() => handleTimeSelection()}
              className="bg-black flex rounded-xl shadow-xl text-white px-7 py-2 my-10 mx-auto font-roxale"
            >
              Save Time
            </button>
          </div>

          {/* Confirm */}
          <div className="mx-auto justify-center items-center flex text-white border-l-2 border-white/10 px-5 phone:pb-10">
            <form >
              <div className="slider-container">
              <h1 className="lg:text-lg mb-4 font-roxale text-white/90 phone:text-center">How would you like your pickup schedule be?</h1>
                <label for="checkbox" className="flex items-center phone:justify-center mb-2 slider-label gap-3 cursor-pointer">
                  Daily
                  <input
                    type="checkbox"
                    id="checkbox"
                    value="Option 1"
                    checked={selectedOptions.includes('Option 1')}
                    onChange={handleCheckboxChange}
                    className="slider-input"
                  />
                  <span class="slider"></span>
                  Weekly
                </label>
              </div>
              <Toaster position="bottom-right" reverseOrder={false} />
                <button
                  type="button"
                  className="bg-black rounded-xl shadow-xl text-white px-10 font-roxale py-2 mt-10 flex mx-auto"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreviousOrdersPage;

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
