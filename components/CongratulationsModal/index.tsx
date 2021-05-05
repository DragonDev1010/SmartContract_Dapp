import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Button from "../styled/Button";

const validateEmail = (e) => {
  const isString = (s) => typeof s === "string";
  const isUnderMaxLength = (max, s) => s.length < max;
  const noLineBreak = (s) => !s.includes("\n");
  const validator = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const noBars = (s) => !s.includes("|");
  return (
    isString(e) &&
    isUnderMaxLength(100, e) &&
    noLineBreak(e) &&
    validator.test(e) &&
    e.length < 100 &&
    noBars(e)
  );
};

const validateName = (n: string) => {
  const isString = (s: string) => typeof s === "string";
  const isUnderMaxLength = (max: number, s: string) => s.length < max;
  const isOverMinLength = (min: number, s: string) => s.length > min;
  const noLineBreak = (s: string) => !s.includes("\n");
  const noBars = (s: string) => !s.includes("|");
  return (
    isString(n) &&
    isOverMinLength(0, n) &&
    isUnderMaxLength(41, n) &&
    noLineBreak(n) &&
    noBars(n)
  );
};

export default function CongratulationsModal(props: {
  toggleModal: () => void;
  showModal: { addy: string; rank: string };
}) {
  const [nameIsValid, setNameValid] = useState(undefined);
  const [emailIsValid, setEmailValid] = useState(undefined);

  const formName = useRef(null);
  const formEmail = useRef(null);

  function saveEmail() {
    const _nameIsValid = validateName(formName.current.value);
    const _emailIsValid = validateEmail(formEmail.current.value);
    if (!_nameIsValid) {
      return alert(
        "Name is not valid. Please check the form input and try again."
      );
    }
    if (!_emailIsValid) {
      return alert(
        "Email is not valid. Please check the form input and try again."
      );
    }
    if (_nameIsValid && _emailIsValid) {
      fetch(
        `https://api.mucitadel.io/api?name=${formName.current.value}&email=${formEmail.current.value}&rank=${props.showModal.rank}&address=${props.showModal.addy}`
      )
        .then(() => {
          alert("successfully subscribed!");
          props.toggleModal();
        })
        .catch(() =>
          alert(
            "It seems the request failed. Is it your internet our our server?"
          )
        );
    }
  }
  //   function saveEmail() {
  //     // const _nameIsValid = validateName(formName.current.value);
  //     // const _emailIsValid = validateEmail(formEmail.current.value);
  //     // if (_nameIsValid) setNameValid(true);
  //     // else setNameValid(false);
  //     // if (_emailIsValid) setEmailValid(true);
  //     // else setEmailValid(false);
  //     if (nameIsValid && emailIsValid) {
  //       const text = `name: ${formName.current.value}
  // email: ${formEmail.current.value}
  // rank: ${props.showModal.rank}
  // addy: ${props.showModal.addy}`;
  //       alert(text);
  //     } else alert("Invalid input");
  //   }
  function updateValidState() {
    const _nameIsValid = validateName(formName.current.value);
    const _emailIsValid = validateEmail(formEmail.current.value);
    if (_nameIsValid) setNameValid(true);
    else setNameValid(false);
    if (_emailIsValid) setEmailValid(true);
    else setEmailValid(false);
  }
  return (
    <div
      className={
        !props.showModal.addy
          ? "hidden"
          : "fixed origin-top-left top-0 left-0 z-20 h-screen w-full"
      }
    >
      <div className="flex items-center justify-center h-full w-full bg-mupurple bg-opacity-60">
        <div
          className="absolute origin-top-right top-0 right-0 w-14 h-14 flex justify-around cursor-pointer items-center bg-asidebg hover:bg-asidebg-hover rounded-bl-xl hover:text-white"
          onClick={props.toggleModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="bg-mainbg rounded-xl w-full overflow-hidden max-w-max mx-3 sm:mx-10">
          <div className="text-title text-secondary text-lg font-semibold justify-around max-w-full">
            {/* <div className="w-full flex justify-between">
              <div className="px-10 flex justify-around items-center">
                Life is happier today
              </div>
              <div
                className="w-14 h-14 flex justify-around cursor-pointer items-center hover:bg-asidebg hover:text-white"
                onClick={props.toggleModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div> */}
            {/* <div className="max-w-max pb-3">Choose your login method:</div> */}

            <div className="flex bg-asidebg max-w-full md:max-w-3xl lgish:max-w-5xl box-border text-base sm:text-lg">
              <div className="h-full w-0 lgish:min-w-4xl lgish:w-5/12 invisible lgish:visible">
                <img
                  src={
                    "/images/metal-tiers/" +
                    (props.showModal.rank || "bronze") +
                    ".png"
                  }
                  alt="MemeUnity MU Citadel bronze tier card back side"
                  // className="h-full object-cover"
                  // className=
                />
              </div>
              <div className="p-5 sm:p-8 lgish:p-10 max-w-full sm:max-w-md lgish:max-w-none lgish:w-8/12">
                <div className="flex items-center mb-5 lgish:mb-0">
                  <div className="h-full flex lgish:hidden w-24 flex-shrink-0 mr-5">
                    <img
                      src="/images/metal-tiers/bronze.png"
                      alt="MemeUnity MU Citadle bronze tier card back side"
                      className="h-full "
                      // className=
                    />
                  </div>
                  <h1 className="text-mupurple font-title text-xl xs:text-2xl sm:text-3xl lgish:text-4xl font-bold mb-2 lgish:mb-5">
                    Congratulations, you bought a {props.showModal.rank} card!
                  </h1>
                </div>
                <p className="mb-5">
                  As the owner of a bronze membership card, you can experience
                  MU Citadel and MemeUnity in a more wholesome way!
                </p>
                <p className="mb-3 text-white">
                  Your card will get added automatically to your Ethereum
                  address within the next two weeks. Subscribe so we can tell
                  you when this happens!
                </p>
                <input
                  className={(() => {
                    let specialClass = "";
                    if (nameIsValid === false)
                      specialClass += " border-red border";
                    return (
                      "bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-3 w-full" +
                      specialClass
                    );
                  })()}
                  type="text"
                  placeholder="Name"
                  id="modal-form-name"
                  ref={formName}
                  onChange={updateValidState}
                />
                <input
                  className={
                    (() => {
                    let specialClass = ""
                    if (emailIsValid === false) specialClass += " border-red border"
                    return "bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-3 w-full"
                    + specialClass
                  })()
                    // prettier-ignore
                    // ((emailIsValid === undefined && "") &&
                    // (emailIsValid === false && "border-red border ") &&
                    // (emailIsValid === true && "")) +
                    // "bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-3 w-full"
                  }
                  type="email"
                  placeholder="Email"
                  id="modal-form-email"
                  ref={formEmail}
                  onChange={updateValidState}
                />
                <Button
                  className="w-full text-white mt-3 text-lg"
                  onClick={saveEmail}
                >
                  Stay informed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
