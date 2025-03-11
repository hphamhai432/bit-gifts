import React from "react";
import { useAuth } from "./use-auth-client";
import Logo from "./components/Logo";
import TopNav from "./components/TopNav";
import {
  BsArrowDownCircle,
  BsDiscord,
  BsQuote,
  BsTwitterX,
} from "react-icons/bs";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

function Landing() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/account");
  }

  return (
    <>
      <TopNav tab="new" />
      <div className="banner py-16">
        <h1 className="text-[4rem] lg:text-[9rem] font-thin text-center mb-4 lg:mb-32 mt-0 lg:px-8 lg:mt-16 text-gray-800">
          BitGifts
        </h1>
        <p className="text-xl text-gray-700 w-max-center text-center m-auto">
          <span className="hidden lg:block">
            Send your friends and family the gift of Bitcoin with a simple,
            easy-to-use gift.
          </span>
          <br />
          The perfect way to introduce loved ones to the world of digital
          currency.
        </p>
      </div>

      <div className="row">
        <div className="w-max-center text-xl py-8 text-center">
          <h2 className="text-center w-full pt-4">How it works</h2>
        </div>
        <div className="w-max-center py-8 text-center">
          <div className="w-max-center grid grid-cols-1 lg:grid-cols-3 gap-3">
            <p>
              <img
                src="/external/bitcoin.svg"
                className="object-fit py-4 w-24 h-24"
              />
              <h3>Gift Bitcoin Easily</h3>
              Send Bitcoin as a gift with just a few clicks. Personalize your
              gift and share the power of digital currency with anyone.
            </p>
            <p>
              <img
                src="/external/ckbtc.svg"
                className="object-fit py-4 w-24 h-24"
              />
              <h3> Powered by ckBTC</h3>
              Enjoy low transaction fees and fast transfers using ckBTC, a token
              fully on-chain and backed by real Bitcoin.
            </p>
            <p>
              <img
                src="/external/icp.svg"
                className="object-fit py-4 w-24 h-24"
              />
              <h3>Built on the Internet&nbsp;Computer</h3>
              Experience the speed, security, and scalability of the Internet
              Computer blockchain, enabling seamless Bitcoin transactions.
            </p>
          </div>
          <br />

          <a className="button" href="/learn">
            Learn More About How It Works
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export const ImageTextCTA = ({
  title,
  text,
  cta,
  img,
  imageRight,
  className,
}: {
  title: string;
  text: string;
  cta: string;
  img: string;
  imageRight: boolean;
  className?: string;
}) => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={"pt-8" + (className ? " " + className : "")}>
      <div
        className={
          "w-max-center pb-8 flex flex-col lg:flex-row gap-4" +
          (imageRight ? " lg:flex-row-reverse" : "")
        }
      >
        <img
          src={img}
          className="w-full max-w-full lg:w-1/2 rounded object-cover"
        />
        <div className="w-full lg:w-1/2 px-4 sm:px-8 py-4 flex flex-col text-lg">
          <div className="grow" />
          <h2>{title}</h2>
          <p className="w-2/3 py-8">{text}</p>
          <Button
            variant="cta"
            size="lg"
            onClick={isAuthenticated ? () => navigate("/account") : login}
            className="w-full lg:w-2/3 max-w-md m-auto lg:m-0"
          >
            {cta}
          </Button>
          <div className="grow" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
