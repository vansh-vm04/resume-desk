import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { months, years } from "../../constants/data";
import { useSelector, useDispatch } from 'react-redux';
import {clearExperience, setExperience} from '../../features/resume/resumeSlice'
import { useNavigate } from "react-router-dom";

const Experience = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const dispatch = useDispatch();
  const exp = useSelector((state)=>state.resume.experience);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(setExperience({...data,Working:currentlyWorking}));
  };

  const handleClear = ()=>{
      dispatch(clearExperience());
      }

  return (
    <div className=" h-full w-full flex md:ml-[216px] items-center justify-center">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/education")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-3/4 gap-2 md:p-10 pt-10 items-center w-full justify-center"
      >
        <h1 className="text-3xl font-bold max-md:text-2xl">
          Add your recent job
        </h1>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:p-4 gap-6 py-4 px-20 items-center h-1/2 justify-center w-full">
          <div className="w-full h-full">
            <label>Job Title</label>
            <input
              className="input2"
              placeholder="e.g. Senior Software Developer"
              {...register("jobTitle",{required:true})}
            />
            {errors.jobTitle && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Company Name</label>
            <input
              className="input2"
              placeholder="e.g. Microsoft"
              {...register("cname",{required:true})}
            />
            {errors.cname && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Company Location</label>
            <input
              className="input2"
              placeholder="e.g. New Delhi, India"
              {...register("clocation")}
            />
            {errors.clocation && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 max-sm:grid-cols-2 max-md:p-4 gap-6 px-20 pb-4 items-center justify-center w-full">
          <div className="w-full h-full flex flex-col gap-2">
            <label>Start Date</label>
            <select className="input2" {...register("smonth")}>
              {months.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select className="input2" {...register("syear")}>
              {years.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>

            <div className="w-full flex h-full gap-2 mt-6">
              <input
                type="checkbox"
                className="min-w-5 hover:cursor-pointer"
                onChange={(e) => setCurrentlyWorking(e.target.checked)}
              />
              <label className="text-xl flex items-center text-nowrap">
                I currently work here
              </label>
            </div>
          </div>

          <div className="w-full h-full flex flex-col gap-2">
            <label>End Date</label>
            <select className="input2" {...register("emonth")} disabled={currentlyWorking}>
              {months.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select className="input2" {...register("eyear")} disabled={currentlyWorking}>
              {years.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {isSubmitting && <div>Loading...</div>}
        
        <div className="items-center justify-center flex gap-2 flex-wrap">
        <button
              type="button"
              onClick={() => handleClear()}
              className="text-white bg-red-600 hover:bg-red-500  focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-500 font-medium rounded-lg px-4 py-2 max-w-32"
            >
              Clear All
            </button>
        <button className="text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-blue-800 rounded-lg px-8 py-2" 
        onClick={handleSubmit(onSubmit)}>
          Add Experience
        </button>
        <button
        onClick={() => navigate("/projects")}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2"
        >Next: Projects</button>
        </div>
        <div className="flex flex-col gap-2 py-2 md:px-20 max-md:p-2 w-full items-center justify-center">
          {exp.length > 0 && (
            exp.map((exp, index) => (
              <div
                key={index}
                className="p-5 border rounded-md shadow-md w-full"
              >
                <div className="justify-between flex">
                  <h1 className="text-xl font-bold">{exp.jobTitle}, {exp.cname}</h1>
                  <span>{exp.smonth+" "+exp.syear} - {exp.Working ? (<span>Present</span>)
                  : <span>{exp.emonth+" "+exp.eyear}</span>}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </div>
  );
};

export default Experience;
