import { useEffect, useState } from "react";
export default function Emailtest() {
  const [response, setResponse] = useState({});
  const details = {
    name: "Asterix the bear 🐻",
    email: "asterix+bear@gmail.com",
    address: "0xAd9b97fa8f28daCa6731d116d6fD2C72A164Ae0c",
    type: "bronze",
  };
  const stringified = Object.entries(details)
    .map((pair) => pair.map((entry) => encodeURIComponent(entry)).join("="))
    .join("&");
  const divs = JSON.stringify(response)
    .split("\n")
    .map((str) => <div>{str}</div>);

  useEffect(() => {
    fetch("https://api.mucitadel.io/v1/form/landingform", {
      method: "POST",
      headers: {
        "Accept-Language": "sl-SI",
        Authorization: "empty string",
      },
      body: stringified,
    })
      .then((res) => res.json())
      .then(setResponse)
      .catch(setResponse);
  });

  return <>{divs}</>;
}
