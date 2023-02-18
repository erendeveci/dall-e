import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex  flex-col  max-h-[95%] hidden absolute bottom-0 left-0 right-0 m-2 p-4 rounded-md bg-[#10131f]  transition duration-700">
        <p className="text-white text-md  overflow-y-auto">{prompt}</p>

        <div className="flex justify-between">
          <div className="flex items-center justify-between  gap-2 mt-4">
            <div className="bg-green-800 w-7 h-7 rounded-full  flex items-center justify-center text-white text-xs">
              {" "}
              {name[0]}
            </div>
            <p className="text-white text-sm"> {name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="bg-transparent border-none outline-none"
          >
            <img src={download} className="w-7 h-7 invert" alt="download" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
