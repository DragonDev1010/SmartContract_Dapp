import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { AuthData, LogIn, LogOut } from "../types/AuthenticationProvider";

function MainLogo() {
  return (
    <img src="/images/mucitadel-white.svg" className="" alt="MemeUnity Logo" />
  );
}

function Logo(props: { sidebar?: boolean; className?: string }) {
  return (
    <div
      className={
        (props.sidebar ? "ml-6" : "ml-0") +
        " flex flex-row items-center w-40 mr-auto lg:mx-0" +
        (props.className ? " " + props.className : "")
      }
    >
      <MainLogo />
    </div>
  );
}

export default function NavBar(props: {
  sidebar?: boolean;
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-row pt-5 bg-black bg-opacity-50 items-center px-6 w-full -mb-px">
      {props.sidebar ? (
        <FontAwesomeIcon icon={faBars} className="text-3xl mr-2 lg:hidden" />
      ) : undefined}
      {/* <ActiveLink href={router.pathname === "/" ? "#" : "/"}> */}
      <Logo sidebar={props.sidebar} className="flex-shrink-0" />
      <h1 className="text-3xl font-title font-extrabold text-mupurple mx-auto w-96 xl:w-full text-center">
        MEMEUNITY MEMBERSHIP CARD SALE IS LIVE!
      </h1>
      {/* <h1 className="ml-auto">MU Citadle in 2 hrs</h1> */}
      {/* </ActiveLink> */}
      {/* <SearchBar className="hidden lg:flex" />
      <NavRightSide
        logIn={props.logIn}
        logOut={props.logOut}
        authData={props.authData}
        hasMetamask={props.hasMetamask}
      /> */}
    </div>
  );
}
