import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
   
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error fetching user profile", error.message);
      });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center">
            <img className="h-8 md:h-12" src="/logo.svg" alt="Logo" /><span className = "font-bold text-2xl ml-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">GoPlan AI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <a href="/create-trip">
                  <Button className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all duration-200">
                    + Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button variant="outline" className="rounded-full">
                    My Trips
                  </Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user?.picture}
                      className="h-10 w-10 rounded-full border-2 border-white shadow-md"
                      alt="Profile"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 text-center">
                    <button
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="w-full py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button 
                onClick={() => setOpenDialog(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {user ? (
              <>
                <a 
                  href="/create-trip" 
                  className="block w-full py-2 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  + Create Trip
                </a>
                <a 
                  href="/my-trips" 
                  className="block w-full py-2 text-center border rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Trips
                </a>
                <button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="block w-full py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setOpenDialog(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500"
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md p-8 text-center">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="mx-auto h-12 mb-6" alt="Logo" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In With Google
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to the App with Google authentication securely
              </p>
              <button
                onClick={login}
                className="w-full py-3 px-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-3 text-gray-700 font-medium"
              >
                <FcGoogle className="w-6 h-6" />
                Sign In With Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;






