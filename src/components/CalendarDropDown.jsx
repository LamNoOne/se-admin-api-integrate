import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function CalendarDropDown() {
    const [date, setDate] = useState(new Date())
    return (
        <Menu as="div" className="relative text-left flex justify-end">
            <div>
                <Menu.Button className="inline-flex h-[40px] justify-between items-center px-2 border rounded bg-[#f4f6f8]">
                    {date.length > 0 ? (
                        <p className="text-center text-sm">
                            <span className="bold">S:</span>{" "}
                            {date[0].toDateString()}
                            &nbsp;|&nbsp;
                            <span className="bold">E:</span>{" "}
                            {date[1].toDateString()}
                        </p>
                    ) : (
                        <p className="text-center text-sm">
                            <span className="bold">Now:</span>{" "}
                            {date.toDateString()}
                        </p>
                    )}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute w-[288px] right-0 z-10 mt-12 origin-top-right rounded-md bg-[rgba(0,0,0,0.4)] backdrop-filter backdrop-blur-[75px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                onClick={(e) => e.preventDefault()}
                                className="calendar w-full overflow-hidden"
                            >
                                <div className="calendar-container w-full">
                                    <Calendar
                                        onChange={setDate}
                                        value={date}
                                        selectRange={true}
                                    />
                                </div>
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
