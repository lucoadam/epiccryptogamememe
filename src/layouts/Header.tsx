import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import Modal from "@/components/Modal";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const path = router.pathname;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [darkerHeader, setDarkerHeader] = React.useState(false);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  // const {wallet, disconnectWallet } =
  //   useWallet();
  const { disconnect } = useDisconnect();

  const ethAccount = useAccount();
  const walletType = useMemo(() => {
    if (ethAccount.isConnected) {
      return "Binance Smart Chain";
    }
    return "";
  }, [
    // wallet,
    ethAccount.isConnected,
    ethAccount.address,
  ]);
  const connected = useMemo(() => {
    return ethAccount.isConnected;
  }, [
    ,
    // wallet
    ethAccount.isConnected,
  ]);

  const walletAddress = useMemo(() => {
    if (ethAccount.isConnected) {
      return ethAccount.address;
    }
    return "";
  }, [ethAccount.isConnected, ethAccount.address]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const trimWallet = (wallet: string, limit = 5) => {
    return (
      wallet.slice(0, limit) +
      "..." +
      wallet.slice(wallet.length - 4, wallet.length)
    );
  };
  useLayoutEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setDarkerHeader(true);
      } else {
        setDarkerHeader(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <>
      <Modal
        showModal={isModalOpen}
        setShowModal={setIsModalOpen}
        showCloseIcon
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-slate-50">
            Connect <span className="text-[#D1EF1A]">Wallet</span>
          </h1>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => {
                // disconnectWallet();
                // connect({ connector })
                // setIsModalOpen(false);
              }}
              disabled={true}
            >
              Polkadot Extension (Coming Soon)
            </Button>
            <Button
              onClick={() => {
                // disconnectWallet();
                // connect({ connector })
                // setIsModalOpen(false);
              }}
              disabled={true}
            >
              Subwallet (Coming Soon)
            </Button>
          </div>
        </div>
      </Modal>

      <header
        className={`shadow-lg fixed w-full ${
          darkerHeader ? "bg-[rgba(0,0,0,0.9)]" : "bg-[rgba(0,0,0,0.4)]"
        } z-20`}
      >
        <div className="max-w-7xl mx-auto py-6 relative px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-normal">
            <Link
              href="/"
              onClick={(e) => {
                if (path === "/") {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <h1 className="text-2xl font-bold text-slate-50">
                Epic Crypto Meme Games
                {/* <span className="text-[#D1EF1A]">$COMAI</span> */}
              </h1>
            </Link>
            <button
              className="ml-3 sm:hidden"
              onClick={handleMenuToggle}
              type="button"
            >
              <svg
                className="h-6 w-6 fill-current text-slate-50"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.29289 4.29289C4.65338 3.93241 5.22061 3.90468 5.6129 4.2097L5.70711 4.29289L12 10.585L18.2929 4.29289C18.6534 3.93241 19.2206 3.90468 19.6129 4.2097L19.7071 4.29289C20.0676 4.65338 20.0953 5.22061 19.7903 5.6129L19.7071 5.70711L12.7071 12.7071C12.3166 13.0976 11.6834 13.0976 11.2929 12.7071L4.29289 5.70711C3.98786 5.31658 3.96013 4.68342 4.22061 4.29289L4.29289 4.20711L4.29289 4.29289Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                  />
                )}
              </svg>
            </button>
          </div>

          <nav
            className={`text-[18px] sm:flex ${
              isMenuOpen
                ? "block absolute bg-[#0000008f] rounded-lg py-8 right-0 top-12 px-4 mb-5 sm:hidden"
                : "hidden"
            }`}
          >
            <div className="flex gap-3 sm:hidden">
              <Button
                onClick={() => {
                  if (!connected) {
                    setIsModalOpen(true);
                  } else {
                    if (walletType === "Binance Smart Chain") {
                      disconnect();
                      setIsModalOpen(false);
                    }
                  }
                }}
                variant="rounded"
              >
                {connected ? trimWallet(walletAddress ?? "") : "Connect Wallet"}
              </Button>
              {/* </a> */}
            </div>
          </nav>

          <div className="hidden sm:flex gap-3">
            <Button
              className="relative"
              onClick={() => {
                if (!connected) {
                  setIsModalOpen(true);
                } else {
                  if (walletType === "Binance Smart Chain") {
                    disconnect();
                    setIsModalOpen(false);
                  }
                }
              }}
              variant="rounded"
            >
              {/* <span className="absolute -right-[1.5px] -top-[1.5px] flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span> */}
              {connected ? trimWallet(walletAddress ?? "") : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
