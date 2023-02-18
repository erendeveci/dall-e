import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

import { Loader, FormField } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://dall-e-clone-1pu2.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        console.log("after await line");
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    // console.log(e.target.name);

    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const [isEmptyPrompt, setIsEmptyPrompt] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      setIsEmptyPrompt(false);
      try {
        setGeneratingImg(true);
        const response = await fetch("https://dall-e-clone-1pu2.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setIsEmptyPrompt(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] max-w-[900px] text-[16px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-7xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeHolder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeHolder="A plush toy"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          {isEmptyPrompt && (
            <p className="text-[14px] text-red-600 underline">
              Please enter prompt !
            </p>
          )}

          <div className="relative   bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focust:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            )}

            {generatingImg && (
              <div className="absolute bg-[rgba(0,0,0,0.5)] z-0 rounded-lg flex w-full h-full justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex ">
          <button
            type="button"
            onClick={generateImage}
            className="bg-green-700 w-full sm:w-auto text-white px-5 py-2.5 rounded-md text-sm font-medium text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-5">
          <p className="text-sm mt-2 text-[#666e75]">
            {" "}
            Once you have created the image you want ,you can share it with
            others in the community
          </p>
          <button
            className=" mt-5 bg-blackColor w-full sm:w-auto text-white px-5 py-2.5 rounded-md text-sm font-medium text-center
          hover:bg-slate-200 hover:text-black transition duration-700"
          >
            {" "}
            {loading ? "Sharing" : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
