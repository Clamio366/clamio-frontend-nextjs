"use client"
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AiOutlineUser, AiOutlineShopping ,AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";


interface CreatorCardProps {
  name: string;
  followers: string;
  products: string;
  description: string;
}


function CreatorCard({
  name = "",
  followers = "",
  products = "",
  description = "",
}: CreatorCardProps) {

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Card className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden border border-gray-200">
      <div className="relative px-6 py-5">
        <img
          className="w-full h-36 object-cover rounded-lg"
          src="https://images.unsplash.com/photo-1583621908511-e082803e3aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWVsbG93JTIwYmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D"
          alt="Cover"
        />
        <div className="absolute inset-0 flex items-center justify-center mt-36">
          <div className="shadow-lg w-[4.5rem] h-[4.5rem] rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold z-10">
            <AiOutlineUser />
          </div>

        
        </div>

        <div className="p-1 absolute top-7 right-8 rounded-full border bg-white border-gray-300">
              {isLiked ? (
                <AiFillHeart
                  className="text-red-500  text-2xl cursor-pointer"
                  onClick={toggleLike}
                />
              ) : (
                <AiOutlineHeart
                  className="text-gray-500 text-2xl cursor-pointer"
                  onClick={toggleLike}
                />
              )}
            </div>
      </div>
      <CardContent className="relative mt-5 p-4">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{name}</h3>
        <div className="flex justify-center mb-2 items-center">
          <AiOutlineUser className="text-gray-600 mr-1" />
          <p className="text-sm text-gray-600 mr-4">{followers}</p>
          <AiOutlineShopping className="text-gray-600 mr-1" />
          <p className="text-sm text-gray-600">{products}</p>
        </div>
        <p className="text-sm text-gray-700 text-center leading-relaxed">{description}</p>
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center">
            <FaUserPlus className="text-xl mr-2" /> Follow
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatorCard;
