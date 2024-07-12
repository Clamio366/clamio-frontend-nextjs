import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { RootState } from "@/Store/store";
import { useSelector, useDispatch } from "react-redux";

import { LogOut } from 'lucide-react';
import { setIsLoggedIn } from "@/utils/authSlice";
import { BG_IMAGE } from "@/constants/data";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { setIsCreatorLoggedIn } from "@/utils/creatorSlice";

const MobileNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((store: RootState) => store.user.isLoggedIn);
  const isCreatorLogin = useSelector((store: RootState) => store.creator.isCreatorLoggedIn);

  const handleLogout = () => {
    if (isLoggedIn) {
      deleteCookie('user');
      dispatch(setIsLoggedIn(false));
      router.push('/');
    }

    if (isCreatorLogin) {
      deleteCookie('creator');
      dispatch(setIsCreatorLoggedIn(false));
      router.push('/explore');
    }
  };
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image 
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="bg-white md:hidden p-0">
          {!isLoggedIn && !isCreatorLogin && (
            <Image
              className="mx-5 my-5"
              src="/assets/images/CLAMIO.svg"
              alt="logo"
              width={128}
              height={38}
            />
          )}
          {(isLoggedIn || isCreatorLogin) && (
            <div>
              <div
                className="relative h-40 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${BG_IMAGE})`,
                }}
              >
                <div className="absolute inset-0 "></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      className="rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="bg-gray-200">CN</AvatarFallback>
                  </Avatar>
                  <div className="text-white">
                    <p className="text-lg shadow-sm font-bold">John Doe</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col items-start ">
                <NavItems />
                <button
                  onClick={handleLogout}

                  className="flex items-center my-5 gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
          <Separator />
          <div className="p-6">
            {!isLoggedIn && !isCreatorLogin && <NavItems />}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
