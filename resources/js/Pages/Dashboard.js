import React, { useState, useEffect } from "react"; 
import Authenticated from "@/Layouts/Authenticated";
import { Link,Head } from "@inertiajs/inertia-react";
import Button from "@/Components/Button"; 
import axios from "axios";

export default function Dashboard(props) {

    //useState for City And B data sets
    const [data_a, setDataA] = useState([]);
    const [data_b, setDataB] = useState([]);
     
    function formatdate(date) {
        // This function formats the date from sql format to more readble format

        //Days array
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        //Months Array
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        //sub string the date value outof the timestamp
        let datesubstring = date.substring(0, 10);
        //Seperate the Time by 'T' to get the time
        let timesplits = date.split("T");
        //Time substring to a timestamp value
        let timesubstring = timesplits[1].substring(0, 8);
        let timesplits_inner = timesubstring.split(":");

        //validate the time and apply the AM PM 
        var ampm = "AM";
        if (timesplits_inner[0] >= 12) {
            ampm = "PM";
        } else {
            ampm = "AM";
        }

        //create date instance from retrived date string
        const dateval = new Date(datesubstring);

        // create new readable date format. 
        // Eg: Sunday, 15 May 2022,17:20:15 PM
        let formattedDate =
            days[dateval.getDay()] +
            ", " +
            dateval.getDate() +
            " " +
            months[dateval.getMonth()] +
            " " +
            dateval.getFullYear() +
            "," +
            timesubstring +
            " " +
            ampm;

        //return formatted date string
        return formattedDate;
    }

    async function loadHottestEntries() {
        // This function is called to retrive hottest values ordered into the table
        //axois API call to backend
        await axios
            .get("/load-hottest-temperatures/", {
                params: {
                    id: props.user_id,
                },
            })
            .then((response) => {
                //set the values to  each table using seperate useState
                setDataA(response.data["temperature_data_a"]);
                setDataB(response.data["temperature_data_b"]);
            });
    }

    async function resetEntries() {
        // This function is called to retrive reset values ordered in chronological order
        //axois API call to backend
        await axios
            .get("/load-user-temperatures/", {
                params: {
                    id: props.user_id,
                },
            })
            .then((response) => {
                //set the values to  each table using seperate useState
                setDataA(response.data["temperature_data_a"]);
                setDataB(response.data["temperature_data_b"]);
            });
    }

    async function loadTemperatureData() {
        // This function is called to retrive intial user temperature data in chronological order
        //axois API call to backend
        await axios
            .get("/load-user-temperatures/", {
                params: {
                    id: props.user_id,
                },
            })
            .then((response) => {
                //set the values to  each table using seperate useState
                setDataB(response.data["temperature_data_b"]);
                setDataA(response.data["temperature_data_a"]);
            });
    }

    useEffect(() => {     
        //useEffect used to load the data on page load   
        loadTemperatureData();
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Login Temperatures
                    </h2>
                    <h5>User : {props.user_name}</h5>
                    <h6>Email : {props.user_email}</h6>
                    <Link href={route('logout')} className="text-sm text-white underline bg-red-400 border border-transparent rounded-md p-1 m-2 ml-0">
                            Logout
                        </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="button-container p-4 border-b border-gray-200">
                            {/* hottest first button */}
                            <button
                                onClick={loadHottestEntries}
                                className="ml-4 bg-red-700 inline-flex items-center px-4 py-2  border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                            >
                                Hottest First
                            </button>
                            {/* reset button */}
                            <button
                                onClick={resetEntries}
                                className="ml-4 bg-blue-700 inline-flex items-center px-4 py-2  border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                            >
                                Reset Order
                            </button>
                        </div>
                        <div className="table-container flex flex-row">
                            <div className="table-box bg-blue-50 flex flex-col items-center basis-1/2 p-3">
                                <h1 className="text-xl mb-3   justify-center font-bold">
                                    {props.city_a}
                                </h1>
                                {/* This table displays the City A userwise temperature data */}
                                <table className="rounded-sm border table-auto min-w-full bg-white">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col">Date & Time</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                &#8451;
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                &#8457;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data_a.map((row) => (
                                            <tr
                                                key={row.id}
                                                className="border-b border-gray-100"
                                            >
                                                <td>
                                                     {/* Formatting emthod used to format the timestamp value */}
                                                    {formatdate(row.created_at)}
                                                </td>
                                                <td className="text-right">
                                                    {row.city_a_temp}&#8451;
                                                </td>
                                                <td className="text-right">
                                                    {/* Celsius value converted into Fanahite*/}
                                                    {(row.city_a_temp * 9) / 5 +
                                                        32}
                                                    &#8457;
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-box bg-teal-50 flex flex-col items-center basis-1/2 p-3">
                                <h2 className="text-xl mb-3  justify-center font-bold">
                                    {props.city_b}{" "}
                                </h2>
                                {/* This table displays the City B userwise temperature data */}
                                <table className="rounded-sm border table-auto min-w-full bg-white">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col">Date & Time</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                &#8451;
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                &#8457;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data_b.map((row) => (
                                            <tr key={row.id}>
                                                <td>
                                                    {/* Formatting emthod used to format the timestamp value */}
                                                    {formatdate(row.created_at)}
                                                </td>
                                                <td className="text-right">
                                                    {row.city_b_temp} &#8451;
                                                </td>
                                                <td className="text-right">
                                                    {/* Celsius value converted into Fanahite*/}
                                                    {(row.city_b_temp * 9) / 5 +
                                                        32}{" "}
                                                    &#8457;
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
