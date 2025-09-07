import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/option";
import { SelectTravelesList } from "@/constants/option";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Plane, Calendar, Wallet, Users, MapPin } from "lucide-react";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name == "noOfDays" && value > 5) {
      toast.error("Please enter 5 days or fewer for your trip");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        OnGenerateTrip();
      })
      .catch((error) => {
        console.log("Error fetching user profile", error.message);
        toast.error("Failed to sign in. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Tell Us Your Travel Preferences</span> 🏕️🏝️
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Just provide some basic information, and our trip planner will generate
            a customized itinerary based on your preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Google Api For Get Use Location Places */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <MapPin className="text-blue-500 mr-2" size={20} />
              <h2 className="text-xl font-medium text-gray-800">
                What is your destination of choice?
              </h2>
            </div>
            
            <div className="border rounded-xl overflow-hidden">
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange("location", v);
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      border: 'none',
                      boxShadow: 'none',
                      padding: '8px'
                    })
                  }
                }}
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Calendar className="text-blue-500 mr-2" size={20} />
              <h2 className="text-xl font-medium text-gray-800">
                How many days are you planning your trip?
              </h2>
            </div>
            
            <Input
              placeholder={"Ex. 3 (max 5 days)"}
              type="number"
              min="1"
              max="5"
              className="rounded-xl py-6 text-lg"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Wallet className="text-blue-500 mr-2" size={20} />
              <h2 className="text-xl font-medium text-gray-800">
                What is your budget?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200
                    ${formData?.budget === item.title 
                      ? "border-blue-500 bg-blue-50 shadow-md" 
                      : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h2 className="font-bold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Users className="text-blue-500 mr-2" size={20} />
              <h2 className="text-xl font-medium text-gray-800">
                Who do you plan on traveling with?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200
                    ${formData?.traveler === item.people
                      ? "border-blue-500 bg-blue-50 shadow-md" 
                      : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h2 className="font-bold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Button 
              onClick={OnGenerateTrip} 
              disabled={loading}
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              size="lg"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2" />
                  Generating Your Trip...
                </>
              ) : (
                <>
                  <Plane className="mr-2" size={20} />
                  Generate Trip
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md p-8 text-center rounded-2xl">
          <DialogHeader>
            <DialogDescription className="text-gray-600">
              <img src="/logo.svg" className="mx-auto h-12 mb-6" alt="Logo" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In With Google
              </h2>
              <p className="mb-6">
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
    </div>
  );
}

export default CreateTrip;
