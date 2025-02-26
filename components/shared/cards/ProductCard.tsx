// src/components/shared/cards/ProductCard.tsx
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/action/cart';
import LikeBtn from '@/components/shared/LikeBtn';
import { toast } from "sonner";
import { useTransition } from "react";
import { LoaderCircle } from 'lucide-react';
import { TProduct } from "@/types/product";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart =  () => {
    startTransition(async () => {
        const result = await addToCart(product._id);
   
        if(result.success){
         toast.success(result.message)
        }else{
         toast.info(result.message)
        }
    })
};


  return (
    <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden text-black w-full shadow-lg h-108 flex flex-col justify-between">
      <div className="absolute top-6 right-6">
        {/* <LikeBtn product={product} /> */}
      </div>
      <Link href={`/product/${product._id}`}>
      {Array.isArray(product.images_url) &&        <Image
          src={product.images_url[0]}
          alt="product card"
          width={1000}
          height={1000}
          className="cursor-pointer object-cover h-64 w-full p-4 pb-0"
        /> }

      </Link>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{product.title}</div>
            <div className="text-right">
              {isPending ?  <LoaderCircle className="animate-spin h-5 w-5" />: (             
                 <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-600 cursor-pointer bg-slate-100 rounded-full px-3 py-3 mr-2"
                onClick={handleAddToCart}
              />)}

            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="bg-yellow-500 rounded-full h-4 w-4"></div>
            <div className="ml-2 text-semibold">
              <Link href="/creator/1" className="text-lg">{product.creator_name}</Link>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="text-sm">★ 4.5 (1k)</div>
          </div>
        </div>
        <div className="text-lg font-bold mt-2">₹ {product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
