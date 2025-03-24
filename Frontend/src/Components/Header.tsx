import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Star from '../Svgs/Star';



const Header:React.FC = ()=>{

    // const navigate = useNavigate();

    return (
      <div className="py-6 px-6 flex justify-between items-center text-white bg-[#101010] ">
        
        <h1
          // onClick={() => navigate("/")}
          className="font-bold text-3xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
        >
          CodeDeck
        </h1>
        <ul className="flex justify-between space-x-10">
          <li className="px-4 py-2 border-1 font-semibold border-amber-400 rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-pointer flex w-50 justify-around">
            <Star />
            Star this project
          </li>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 border-1 font-semibold border-amber-400 rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
    );
}

export default Header