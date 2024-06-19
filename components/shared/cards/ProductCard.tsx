'use client'
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import LikeBtn from "../LikeBtn";
import Link from "next/link";

const ProductCard = ({ productName, name, stars, price }: any) => {
  return (
    <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden text-black w-full shadow-lg ">
      <div className="absolute top-2 right-2">
        <LikeBtn />
      </div>
      {/* <div className="">
                <img src={imgOne} alt="" className="" />
            </div> */}
      <Link href={`/product/1`}>
        <Image
          src="/assets/product-img/imgone.png"
          alt="product card"
          width={1000}
          height={1000}
          className="cursor-pointer"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center mt-2 grid grid-cols-2 ">
          <div className="text-lg font-semibold">{productName}</div>
          <div className="text-right ">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-600 cursor-pointer "
            />
          </div>{" "}
        </div>
        <div className="flex items-center mt-2">
          <div className="bg-yellow-500 rounded-full h-4 w-4"></div>
          <div className="ml-2 text-semibold">{name}</div>
        </div>
        <div className="flex items-center mt-2">
          <div className="text-sm">★ {stars}(1k)</div>
        </div>
        <div className="text-lg font-bold mt-2">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
