import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import CongratulationsModal from "../components/CongratulationsModal";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Button from "../components/styled/Button";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";

/* START SMART CONTRACT STUFF */

interface Window {
  ethereum: any;
}

const contractAdd = "0xf668523d0Da7f01DaD537c60b79580D5C0029d68";

const contractAbi = [
  {
    inputs: [],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "bronze_owners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_seller", type: "address" },
    ],
    name: "buy_bronze",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_seller", type: "address" },
    ],
    name: "buy_gold",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_seller", type: "address" },
    ],
    name: "buy_silver",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "get_bronze_owner_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_gold_owner_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_silver_owner_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gold_owners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "invest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "purchase_bronze",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "purchase_gold",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "purchase_silver",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "silver_owners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total_balance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

async function buyGold(
  clientBought: (rank: "silver" | "gold" | "bronze", addy: string) => void
) {
  // clientBought("gold", "gaegagold");
  const provider = new ethers.providers.Web3Provider(
    ((window as unknown) as Window).ethereum
  );

  let contract = new ethers.Contract(
    contractAdd,
    contractAbi,
    provider.getSigner()
  );

  await contract.functions
    .purchase_gold({ value: 15e14 })
    .then(async function (result) {
      const addy = (
        await ((window as unknown) as Window).ethereum.request({
          method: "eth_requestAccounts",
        })
      ).toString();
      clientBought("gold", addy); //alert("Silver Purchased Sucessfully");
    });
}

async function buySilver(
  clientBought: (rank: "silver" | "gold" | "bronze", addy: string) => void
) {
  // clientBought("silver", "gaegasilv");

  const provider = new ethers.providers.Web3Provider(
    ((window as unknown) as Window).ethereum
  );

  let contract = new ethers.Contract(
    contractAdd,
    contractAbi,
    provider.getSigner()
  );

  await contract.functions
    .purchase_silver({ value: 15e14 })
    .then(async function (result) {
      const addy = (
        await ((window as unknown) as Window).ethereum.request({
          method: "eth_requestAccounts",
        })
      ).toString();
      clientBought("silver", addy); //alert("Silver Purchased Sucessfully");
    });
}

async function buyBronze(
  clientBought: (rank: "silver" | "gold" | "bronze", addy: string) => void
) {
  // clientBought("bronze", "gaegabron");
  const provider = new ethers.providers.Web3Provider(
    ((window as unknown) as Window).ethereum
  );

  let contract = new ethers.Contract(
    contractAdd,
    contractAbi,
    provider.getSigner()
  );

  await contract.functions
    .purchase_bronze({ value: 15e14 })
    .then(async function (result) {
      const addy = (
        await ((window as unknown) as Window).ethereum.request({
          method: "eth_requestAccounts",
        })
      ).toString();
      clientBought("bronze", addy); //alert("Silver Purchased Sucessfully");
    });
}

/* END SMART CONTRACT STUFF */

function Card(props: {
  rating: string;
  tier: string;
  price: string;
  minted: string;
  kcalOrUSD?: number;
  traits: number;
  url: string;
  name: string;
}) {
  const { rating, tier, price, minted, url, name, traits } = props;
  const [priceString, currency] = price.split(" ");
  const priceNumber = Number(priceString);
  const kcal = props.kcalOrUSD + (currency === "SOUL" ? " kcal" : " USD");

  return (
    <div className="font-title rounded-lg text-lg font-bold flex-col bg-purple-300 overflow-hidden">
      {/* <div className="bg-success flex justify-around items-center h-8">
        <div className="tracking-wider">{rating}</div>
      </div> */}

      <div className="bg-mupurple flex justify-between px-4 py-2">
        <div>{tier}</div>
        <div>{minted}</div>
      </div>
      <div>
        <img className="max-w-full" src={url} alt={name} />
      </div>
      <div className="bg-mupurple flex justify-center px-4 py-2">
        <div>
          {priceString} {currency}
        </div>
        {/* <div>{kcal}</div> */}
      </div>
    </div>
  );
}

function Content(props: {
  clientBought: (rank: "bronze" | "silver" | "gold", addy: string) => void;
}) {
  const [firstJumpEnabled, enableFirstJump] = useState(false);
  const [secondJumpEnabled, enableSecondJump] = useState(false);
  const [thirdJumpEnabled, enableThirdJump] = useState(false);
  const en1 = () => enableFirstJump(true);
  const en2 = () => enableSecondJump(true);
  const en3 = () => enableThirdJump(true);
  useEffect(() => {
    const timer1 = setTimeout(en1, 0);
    const timer2 = setTimeout(en2, 1000);
    const timer3 = setTimeout(en3, 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  return (
    <div className="w-full h-full font-body">
      {/* <div className="w-full bg-black flex justify-center">
        <img
          // className="w-full object-cover"
          // style={{ height: "640px" }}
          src="images/Carrusel.png"
          alt="Memeunity Card Carrousel"
        />
      </div> */}
      {/* <div className="bg-memeunity-banner bg-no-repeat"> */}
      <div className="pb-20 bg-mainbg">
        <section className="bg-black bg-opacity-50 px-5 md:px-10 lg:px-20 pt-14">
          {/* <h1 className="mx-auto max-w-max text-4xl font-title font-extrabold tracking-wide py-14 text-mupurple text-center">
            memeunity Membership Card Sale
          </h1> */}
          <div className="max-w-6xl flex mx-auto flex-col mdish:flex-row">
            {/* <div
                className="flex-shrink-0 flex justify-center relative -ml-12 mt-11 animate-bounce"
                style={{ width: "60%" }}
              >
                <img
                  src="images/cards/full-size/Paula.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-56 absolute transform rotate-12 left-96 top-8"
                />
                <img
                  src="images/cards/full-size/Elon Musk.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-56 absolute transform -rotate-12 right-96 top-8"
                />
                <img
                  src="images/cards/full-size/epic-mia.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-60 absolute"
                />
              </div> */}
            <figure className="flex flex-grow-0 flex-shrink-0 w-full max-w-lg mdish:max-w-sm h-72 items-center mdish:items-end lg:max-w-md lgish:max-w-lg self-center">
              <div className="w-full">
                <img
                  src="images/metal-tiers/bronze-small.png"
                  alt="Bronze MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    firstJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
              <div className="w-full ml-5">
                <img
                  src="images/metal-tiers/silver-small.png"
                  alt="Silver MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    secondJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
              <div className="w-full ml-5">
                <img
                  src="images/metal-tiers/gold-small.png"
                  alt="Gold MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    thirdJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
            </figure>
            <div className="ml-0 mdish:ml-10 ">
              <h2 className="font-bold text-white font-title text-3xl mb-5">
                Powerful Bonuses with ALL card purchases!
              </h2>
              <p className="text-secondary-hover">
                We are super excited to offer these super-charged memeunity
                Membership Card bonuses to you all!
                <br />
                <br />
                The two bonuses -{" "}
                <strong className="text-white font-bold">
                  MUU Token Airdrops
                </strong>{" "}
                &{" "}
                <strong className="text-white font-bold">
                  MUCitadel fee discounts!
                </strong>{" "}
                - membership card buyers/holders will receive varying MUU token
                airdrops + marketplace fee discounts!
                <br />
                <br />
                <strong className="text-white font-bold">
                  MUU Token Airdrops
                </strong>{" "}
                and{" "}
                <strong className="text-white font-bold">
                  MUCitadel fee discounts
                </strong>{" "}
                will activate when there are{" "}
                <strong className="text-white font-bold">500</strong> membership
                cards sold.
                <br />
                <br />
                <strong className="text-white font-bold">
                  (See below for details)
                </strong>
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mt-20 pb-5">
            <h2 className="font-bold text-white font-title text-3xl mb-5">
              Get your membership card.
            </h2>
            <p className="text-secondary-hover">
              Here's the chance you’ve been waiting for! You can now get your
              hands on your very own{" "}
              <strong className="text-white font-bold">Membership Card</strong>.
              Just pick one of the three available card types:{" "}
              <strong className="text-white font-bold">GOLD</strong>,{" "}
              <strong className="text-white font-bold">SILVER</strong>, or{" "}
              <strong className="text-white font-bold">BRONZE</strong>. There
              are 3 different card designs per tier, each a mystery and are
              equally random in chance!{" "}
            </p>
          </div>
        </section>
        {/* END TOP PART */}
        {/* START CARD INTRO AND BOXES */}
        <div className="px-5 md:px-10 lg:px-20">
          <div className="max-w-2xl mx-auto text-secondary">
            <div className="w-full flex justify-center text-7xl animate-bounce my-14">
              <a
                href="#cardSection"
                className="text-mupurple hover:text-mupurple-hover cursor-pointer"
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </a>
            </div>
            Each category comes with distinct features, although any card has a
            chance of hitting the jackpot with a superb find. You’ll be able to
            see the card 2 weeks after the sale, when our MUCitadel marketplace
            launches. Increase your bonuses by collecting all 3 cards from each
            tier - creating a 3-piece set gives ultimate rewards!
            <br />
            <br />
            Pick from the three available series: GOLD (Nani Tier), with only 15
            cards ever minted, SILVER (Legendary Tier), with 150 cards minted,
            and BRONZE (Epic Tier), with 1500 cards minted.
            <br />
            <br />
            <em>
              NOTE: Card images shown are{" "}
              <strong className="text-white font-bold">random</strong> and{" "}
              <strong className="text-white font-bold">not a guarantee</strong>{" "}
              of which card you will receive.
            </em>
          </div>
          <div
            id="cardSection"
            className="max-w-6xl flex flex-wrap lg:flex-nowrap mx-auto mt-10 justify-center"
          >
            <div className="flex flex-col items-center w-full mx-auto lg:mr-4 rounded-2xl py-6 px-3 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">GOLD</h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img
                  className="rounded-md"
                  src="images/cards/full-size/epic-mia.png"
                  alt=""
                /> */}
              <Card
                minted="1 of 15"
                name="GOLD"
                price="15 ETH"
                rating="1202"
                tier="Nani"
                traits={6}
                url="/images/metal-tiers/gold.png"
                kcalOrUSD={40000}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">15 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Nani</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>15 of 15</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Nani NFT Designs</div>
              <div>50k MUU Token Airdrop monthly</div>
              <div>100% MUCitadel Fee Discount</div>
              <div>
                <a href="https://cryptomasks.co/shop/">
                  Custom Limited Edition MU Swag Pack
                </a>
              </div>
              <div>-Limited Edition Placard</div>
              <div>-Limited Edition Canvas Artwork</div>
              <div>-Limited Edition Backpack</div>
              <div>-MU Dank Logo Shirt</div>
              <div>-MU Dank Hat</div>
              <div>-MU Dank Gaiter</div>
              <div className="mt-10 flex flex-gro w-full px-6w items-end px-6">
                <Button
                  className="w-full"
                  onClick={() => buyGold(props.clientBought)}
                >
                  BUY GOLD
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mx-auto lg:mx-4 mt-5 lg:mt-0 rounded-2xl px-3 py-6 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">
                SILVER
              </h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img
                  className="rounded-md"
                  src="images/cards/full-size/Bunnies.png"
                  alt=""
                /> */}
              <Card
                minted="1 of 150"
                name="SILVER"
                price="1 ETH"
                rating="1202"
                tier="Legendary"
                traits={6}
                url="/images/metal-tiers/silver.png"
                kcalOrUSD={2700}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">1 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Legendary</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>150 of 150</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Legendary NFT Designs</div>
              <div>20k MUU Token Airdrop monthly</div>
              <div>50% MUCitadel Marketplace fee discount</div>
              <div>
                <a href="https://cryptomasks.co/shop/">
                  MU Swag Pack (DANK shirt, hat, gaiter)
                </a>
              </div>
              <div className="mt-10 flex flex-grow items-end w-full px-6">
                <Button
                  className="max-w-full w-full"
                  onClick={() => buySilver(props.clientBought)}
                >
                  BUY SILVER
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mx-auto lg:ml-4 mt-5 lg:mt-0 rounded-2xl px-3 py-6 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">
                BRONZE
              </h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img className="rounded-md" src="images/cards/full-size/Pete.png" alt="" /> */}
              <Card
                minted="1 of 1500"
                name="BRONZE"
                price="0.25 ETH"
                rating="1202"
                tier="Epic"
                traits={6}
                url="/images/metal-tiers/bronze.png"
                kcalOrUSD={680}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">0.25 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Epic</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>1500 of 1500</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Epic NFT Designs</div>
              <div>2.5k MUU Token Airdrop monthly</div>
              <div>25% MUCitadel Marketplace fee discount</div>
              <div>
                <a href="https://cryptomasks.co/shop/shirts/memeunity-dank-shirt/">
                  MU DANK Logo Shirt
                </a>
              </div>
              <div className="mt-10 flex flex-grow items-end w-full px-6">
                <Button
                  className="max-w-full w-full"
                  onClick={() => buyBronze(props.clientBought)}
                >
                  BUY BRONZE
                </Button>
              </div>
            </div>
          </div>
          {/* END CARD BOXES */}
          {/* START POST-CARDS */}
          <div className="max-w-2xl bg-highlightbg mx-auto rounded-xl py-5 flex justify-between px-11 mt-20 just-glow">
            <div className="flex flex-col space-y-5 items-center">
              <div>Bonus #1</div>
              <div className="font-title font-extrabold text-5xl">
                Token Airdrops
              </div>
              <div>Earn up to 50k MUU tokens monthly</div>
            </div>
            <div className="flex flex-col space-y-5 items-center">
              <div>Bonus #2</div>
              <div className="font-title font-extrabold text-5xl">
                MUCitadel Discounts
              </div>
              <div>Up to 100% off MUCitadel transaction fees</div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20 flex flex-col sm:flex-row w-full space-x-0 space-y-10 sm:space-y-0 sm:space-x-5">
            <div className="w-full">
              <div className="h-auto sm:h-44">
                <h1 className="text-3xl font-bold font-title mb-3">Bonus 1:</h1>
                <div className="text-secondary">
                  Free MUU tokens on the 1st of each month.{" "}
                  <strong className="text-white font-normal">EVERY</strong> card
                  offers different MUU token airdrops monthly. We're creating a
                  large MUU token pool to distribute upwards of 50k MUU tokens
                  per month per membership card held.
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-2xl font-bold mt-5 mb-3">Example:</h1>
                <div className="text-secondary">
                  If you buy a GOLD membership card:{" "}
                  <strong className="text-white font-normal">50k MUU </strong>
                  tokens will be distributed to you monthly! Silver = 20k MUU.
                  Bronze card holders will receive 2.5k MUU tokens monthly. This
                  bonus lasts 12 months.
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="h-auto sm:h-44">
                <h1 className="text-3xl font-bold font-title mb-3">Bonus 2:</h1>
                <div className="text-secondary">
                  Save{" "}
                  <strong className="text-white font-normal">up to 100%</strong>{" "}
                  off all MUCitadel transaction fees (excludes ETH gas fees).
                </div>
              </div>
              <div className="w-full">
                <h1 className="text-2xl font-bold mt-5 mb-3">Example:</h1>
                <div className="text-secondary">
                  {" "}
                  If you purchase the{" "}
                  <strong className="text-white font-normal">GOLD</strong> card,
                  you will receive 100% off MUCitadel NFT transaction fees.
                  SILVER cards = 50% off MUCitadel NFT fees, and BRONZE cards =
                  25% off MUCitadel NFT fees.
                  <br />
                  <br />
                  <em>
                    <br />
                    <br />
                    NOTE: $ value is accurate at the time of writing and will
                    change based on ETH’s current price.
                  </em>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="max-w-6xl mx-auto flex w-full space-x-5">
          </div> */}
          <div className="max-w-2xl mx-auto mt-20 text-secondary">
            In order to buy your card(s), please ensure your{" "}
            <strong className="text-white font-normal">wallet</strong> is
            connected and funded with enough ETH.
            <br />
            <br />
            <ol>
              <li>Click the "Buy" button on your desired card series.</li>
              <li>
                Enter the amount of ETH you would like to spend purchasing cards
                of the selected series*
              </li>
              <li>
                Click buy & confirm the transaction in your wallet if requested.
              </li>
              <li>
                Purchased cards will appear in your wallet the day that your
                MUCitadel Marketplace is launched live.
              </li>
            </ol>
            <br />
            <br />
            If you wish to purchase more cards, please purchase again from the
            sale page normally.
            <br />
            <br />
            <span className="text-red text-sm">
              *Card prices will be taken from the current price of ETH when the
              transaction is processed, NOT when you click the buy button in
              step 1.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
}) {
  const [showModal, setShowModal] = useState({
    addy: undefined,
    rank: undefined,
  });
  const toggleModal = (addy?: string, rank?: string) => {
    if (addy && rank) {
      setShowModal({ addy, rank });
    } else setShowModal({ addy: undefined, rank: undefined });
  };
  function clientBought(rank: "silver" | "gold" | "bronze", addy: string) {
    setShowModal({ addy, rank });
  }
  return (
    <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
      <Head>
        <title>MU Citadel - the tree where memes grow</title>
      </Head>
      <NavBar {...props} />
      <Content clientBought={clientBought} />
      <Footer />
      <CongratulationsModal {...{ toggleModal, showModal }} />
    </div>
  );
}
