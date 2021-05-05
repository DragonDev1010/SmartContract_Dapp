// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faLinkedinIn,
  faRedditAlien,
  faTelegramPlane,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Button from "../styled/Button";
import Link from "../styled/Link";

function MainLogo() {
  return (
    <img
      src="/images/mucitadel-white.svg"
      className="object-cover"
      alt="MemeUnity Logo"
    />
  );
}

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

function Logo() {
  return (
    <div className="flex flex-row items-center w-48 mx-auto sm:mx-0 mb-2 mt-px">
      <MainLogo />
      {/* <div className="font-title text-xl font-bold tracking-wider">
        MU&nbsp;Citadel
      </div> */}
    </div>
  );
}

function SubFooter() {
  return (
    <div
      className="pt-px sm:pt-0 h-5 text-xs sm:text-sm text-secondary"
      style={{ backgroundColor: "rgba(20, 16, 23" }}
    >
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="flex justify-around sm:justify-between ">
          <div>Copyright 2021 ©️ MemeUnity</div>
          <a href="/legal/privacy-policy">Privacy Policy</a>
          <a href="/legal/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

function updateValidState(ref, stateSetter, validator) {
  const isValid = validator(ref);
  if (!isValid) stateSetter(false);
  else stateSetter(true);
  // const stateStrObj = JSON.stringify({
  //   name: formName.current.value,
  //   email: formEmail.current.value,
  // });
  // console.log(stateStrObj);
  // const _nameIsValid = validateName(formName.current.value);
  // const _emailIsValid = validateEmail(formEmail.current.value);
  // if (_nameIsValid) setNameValid(true);
  // else setNameValid(false);
  // if (_emailIsValid) setEmailValid(true);
  // else setEmailValid(false);
}

// function FormName(props: {
//   nameIsValid: true | false | undefined;
//   // updateValidState: (ref, stateSetter, validator) => void;
//   setNameValid: (bool: boolean) => any;
//   formName: any;
// }) {
//   return (
//     <input
//       className={(() => {
//         let specialClass = "";
//         if (props.nameIsValid === false) specialClass += " border-red border";
//         return (
//           "bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2" +
//           specialClass
//         );
//       })()}
//       type="text"
//       placeholder="name"
//       ref={props.formName}
//       onChange={() =>
//         updateValidState(props.formName, props.setNameValid, validateName)
//       }
//     />
//   );
// }

// function FormEmail(props: {
//   emailIsValid: true | false | undefined;
//   // updateValidState: (ref, stateSetter, validator) => void;
//   setEmailValid: (bool: boolean) => any;
//   formEmail: any;
// }) {
//   const El = () => (
//     <input
//       type="email"
//       placeholder="Email"
//       className="bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
//     />
//   );
//   return (
//     <input
//       className={(() => {
//         let specialClass = "";
//         if (props.emailIsValid === false) specialClass += " border-red border";
//         return (
//           "bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2" +
//           specialClass
//         );
//       })()}
//       type="email"
//       placeholder="email"
//       ref={props.formEmail}
//       onChange={() =>
//         updateValidState(props.formEmail, props.setEmailValid, validateEmail)
//       }
//     />
//   );
// }

export default function Footer() {
  const formName = useRef(null);
  const formEmail = useRef(null);
  const [emailIsValid, setEmailValid] = useState(undefined);
  const [nameIsValid, setNameValid] = useState(undefined);
  function Title(props) {
    return (
      <h1 className="text-2xl pb-4 font-bold font-title tracking-wide">
        {props.children}
      </h1>
    );
  }

  // function EmptyElement() {
  //   return <></>;
  // }

  // const [AfterFooterForm, setAfterFooterForm] = useState(EmptyElement);

  // function AfterFooterForm(props:{children:any}) {
  //   return <>{props.children}</>
  // }

  const [invalidElement, setInvalidElement] = useState("none");

  function colorAndText() {
    if (invalidElement === "none")
      return { text: "Success!", color: "text-success" };
    if (invalidElement === "name")
      return { text: "Invalid name", color: "text-red" };
    if (invalidElement === "email")
      return { text: "Invalid email", color: "text-red" };
  }

  function PostFormClarification() {
    const { color, text } = colorAndText();
  }

  function FooterElement(props) {
    return (
      <div className="m-0 my-5 mx-10 sm:m-5 sm:w-72 flex flex-col box-border font-body">
        {props.children}
      </div>
    );
  }

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
      // const opts = {
      //   method: "POST" as "POST",
      //   url: "http://localhost:13750/api",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify({
      //     name: formName.current.value,
      //     email: formEmail.current.value,
      //   }),
      // };
      // // fetch("https://hustlecraft.io/api", opts)
      // axios(opts)
      //   .then((res) => res.data)
      //   .then(() => console.log("bla"))
      fetch(
        `https://api.mucitadel.io/api?name=${formName.current.value}&email=${formEmail.current.value}`
      )
        .catch(() =>
          alert(
            "It seems the request failed. Is it your internet our our server?"
          )
        )
        .then(() => {
          alert("successfully subscribed!");
        });
    }
  }

  // const _validateName = () => {
  //   return
  // };

  // const _validateEmail = () => {
  //   return validateEmail(formEmail.current.value);
  // };
  //     const text = `name: ${formName.current.value}
  // email: ${formEmail.current.value}`;

  //     alert(text);
  // if (!_validateEmail()) {
  //   return setInvalidElement("email")
  // }

  //} else alert("Invalid input");

  // function updateValidState() {
  //   const stateStrObj = JSON.stringify({
  //     name: formName.current.value,
  //     email: formEmail.current.value,
  //   });
  //   console.log(stateStrObj);
  //   const _nameIsValid = validateName(formName.current.value);
  //   const _emailIsValid = validateEmail(formEmail.current.value);
  //   if (_nameIsValid) setNameValid(true);
  //   else setNameValid(false);
  //   if (_emailIsValid) setEmailValid(true);
  //   else setEmailValid(false);
  // }

  return (
    <>
      <div className="sm:px-0 lg:px-10 xl:px-32 bg-asidebg mt-10">
        <div className="flex flex-col sm:max-w-2xl lg:max-w-max mx-auto sm:flex-row flex-wrap lg:flex-nowrap -m-5 mt-5 pt-5 pb-10 text-center sm:text-left ">
          <FooterElement>
            {/* <Title>Dank</Title> */}
            <div className="mb-3 flex flex-row">
              <Logo />
            </div>
            <p>
              This will be the beginning of something awesome and full of memes.
            </p>
          </FooterElement>
          <FooterElement>
            <Title>Additional Links</Title>
            <ul className="text-mupurple">
              <li>
                <Link href="https://memeunity.com/#roadmap" target="_blank">
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.google.com/document/d/1hzSz46MQm8Bn4ytWL4Op-LPDWfV7w_NYDMOxTYqFYSs/edit?usp=sharing"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.google.com/document/d/1-GLSxMDTp29buL8rljzrCB7k6lw8mU4FcIrTpcu_pYM/edit?usp=sharing"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="https://www.phantasma.io/wallets" target="_blank">
                  <FontAwesomeIcon icon={faLink} className="mr-3" />
                  Phantasma&nbsp;Wallet
                </Link>
              </li>
            </ul>
          </FooterElement>
          <FooterElement>
            <Title>Contact us</Title>
            <p>Contact us and the community on Telegram or Discord.</p>
            <div className="flex flex-row items-center h-10 mt-3 text-mupurple">
              <a
                className="w-10 text-2xl"
                href="https://www.youtube.com/channel/UCVg0VFYQMFY3EkVMTcyXocQ"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  // style={{ color: "#f70000" }}
                />
              </a>
              <a
                className="w-10 text-2xl ml-4"
                href="https://twitter.com/thememeunity"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  // style={{ color: "#1ca6d6" }}
                />
              </a>
              <a
                className="w-10 text-2xl ml-4"
                href="https://t.me/memeunityontg"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faTelegramPlane}
                  // style={{ color: "#2a9ed0" }}
                />
              </a>
              <a
                className="w-10 text-2xl ml-4"
                href="https://discord.gg/XFXsFfX"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faDiscord}
                  // style={{ color: "#6e85d3" }}
                />
              </a>
              <a
                className="w-10 text-2xl ml-4"
                href="https://www.reddit.com/r/memeunityonreddit/"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  // style={{ color: "#f74300" }}
                />
              </a>
              <a
                className="w-10 text-2xl ml-4"
                href="https://www.linkedin.com/company/memeunity"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  // style={{ color: "#0270ad" }}
                />
              </a>
            </div>
          </FooterElement>
          <FooterElement>
            <Title>A wild newsletter</Title>
            {/* <p>Listen to our tales of woe and glory and stay in touch with the latest memes! Your info will remain safe. ☺️ </p> */}
            <div className="flex flex-col text-center">
              {/* <FormName
                nameIsValid={nameIsValid}
                setNameValid={setNameValid}
                formName={formName}
              />
              <FormEmail
                emailIsValid={emailIsValid}
                setEmailValid={setEmailValid}
                formEmail={formEmail}
              /> */}
              <input
                type="text"
                placeholder="Name"
                ref={formName}
                className="bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
              />
              <input
                type="email"
                placeholder="Email"
                ref={formEmail}
                className="bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75 px-4 py-2 rounded-lg shadow-md mt-2"
              />
              <Button className="mt-2 w-full" onClick={saveEmail}>
                Stay in the loop
              </Button>
              {/* <AfterFooterForm /> */}
            </div>
          </FooterElement>
        </div>
      </div>
      <SubFooter />
    </>
  );
}
