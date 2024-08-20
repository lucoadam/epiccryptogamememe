import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import toast from "react-hot-toast";
import { socketConnect } from "@/provider/SocketProvider";
import { Socket } from "socket.io-client";
import Generating from "./Generating";
import RecentMemes from "./RecentMemes";
import BuyCoffeeForTeam from "./BuyCoffeeForTeam";

const Meme = ({ socket }: { socket: Socket | null }) => {
  const [memes, setMemes] = React.useState([
    {
      _id: "1",
      prompt: "CommuneAI",
      generatedImage: "/meme1.jpeg",
    },
    {
      _id: "2",
      prompt: "CommuneAI Memes",
      generatedImage: "/meme2.jpeg",
    },
  ]);

  React.useEffect(() => {
    // getMemeImages().then((data) => {
    //   setMemes(data.data)
    // })
    fetch("/api/images")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) throw new Error(data.error);
        setMemes(
          data
            .sort((a: any, b: any) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              return dateB.getTime() - dateA.getTime();
            })
            .map((each: any, index: number) => ({
              _id: index.toString(),
              prompt: each.text,
              generatedImage: each.response.signed_urls[0],
            }))
        );
      });
    // setMemes(data);
  }, []);
  // const { wallet, connectWallet, isSigned, accessToken, isConnected } =
  //   useWallet();
  const [userLimit, setUserLimit] = React.useState(0);
  const [generating, setGenerating] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [imagebase64, setImagebase64] = React.useState("");
  // useEffect(() => {
  //   console.log("socket", socket, isSigned, accessToken);
  //   if (!socket) return;
  //   if (!isSigned) return;
  //   if (accessToken === "") return;
  //   socket.disconnect();
  //   console.log("socket disconnected");
  //   socket.auth = { token: accessToken };
  //   console.log("socket auth", socket.auth);
  //   console.log("connecting socket");
  //   socket.connect();
  //   socket.on("authenticated", (data) => {
  //     console.log("authenticated", data);
  //     socket.emit("getLimit");
  //   });

  //   socket.on("getLimit", (data) => {
  //     console.log("getLimit", data);
  //     setUserLimit(data);
  //   });
  //   socket.on("generateMeme", (data) => {
  //     if (data.status === "failed") {
  //       toast.error(data.message || "Something went wrong");
  //       return;
  //     } else if (data.status === "started") {
  //       setGenerating(true);
  //       toast.success("Meme generation started");
  //       return;
  //     } else if (data.status === "success") {
  //       setGenerating(false);
  //       toast.success("Meme generation success");
  //       setImagebase64(data.data);
  //       getMemeImages().then((data) => {
  //         setMemes(data.data);
  //       });
  //       return;
  //     }
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket, isSigned, accessToken]);
  return (
    <div>
      <Modal
        // showModal={!isSigned && isConnected}
        showModal={false}
        setShowModal={() => {
          // connectWallet()
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-slate-50">
            Connect <span className="text-[#D1EF1A]">Wallet</span>
          </h1>
          <div className="flex gap-8 flex-col mt-4">
            {/* <Button disabled={wallet.address !== ""} onClick={() => {}}>
              Phantom  Wallet
            </Button> */}
          </div>
        </div>
      </Modal>
      <div className="text-white pt-[120px] md:pt-[180px] p-8 flex flex-col justify-center items-center">
        <div className="flex justify-between items-center gap-2 mb-6 border-2 border-primary cursor-text rounded-xl p-3 w-[80%] lg:w-[60%]">
          <input
            className={`text-black text-2xl font-semibold rounded-full pl-4 py-4 w-full ${
              userLimit === 0 ? "opacity-50" : ""
            }`}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            placeholder="Generate your meme using text prompt"
          />
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 rounded-full bg-[#333]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-8 h-8 text-yellow-400"
              >
                <circle cx="8" cy="8" r="6"></circle>
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                <path d="M7 6h1v4"></path>
                <path d="m16.71 13.88.7.71-2.82 2.82"></path>
              </svg>
              <span className="ml-1 text-2xl" title="Available Credit">
                {userLimit}
              </span>
            </div>
            <button
              disabled={generating || inputValue === ""}
              onClick={async () => {
                try {
                  if (inputValue === "") {
                    toast.error("Please enter a text prompt");
                    return;
                  }
                  setGenerating(true);
                  const response = await fetch("/api/generate", {
                    method: "POST",
                    body: JSON.stringify({
                      text: inputValue,
                    }),
                  }).then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    toast.error(
                      `${response.status} ${response.statusText}` ||
                        "Something went wrong"
                    );
                  });
                  if (response.error) {
                    setGenerating(false);
                    toast.error(response.error);
                    return;
                  }
                  setGenerating(false);
                  toast.success("Meme generation started");
                  setImagebase64(response?.signed_urls[0] || "");
                } catch (err: any) {
                  setGenerating(false);
                  toast.error(err.message || err || "Something went wrong");
                }
              }}
              className="inline-flex items-center justify-center rounded-md text-2xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 opacity-100 hover:bg-primary h-10 px-4 py-2 bg-primary text-white"
            >
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <BuyCoffeeForTeam />
          {!generating && imagebase64 !== "" ? (
            <img
              alt={inputValue}
              className="rounded-lg mt-4"
              height="200"
              src={imagebase64}
              style={{ objectFit: "cover" }}
              width="640"
            />
          ) : generating ? (
            <Generating />
          ) : null}
          {!generating && imagebase64 !== "" && (
            <Button
              disabled
              className="border-[#d1ef1a] mt-10 bg-[#d1ef1a] !text-[#333] hover:!font-bold hover:!bg-[#d1ef1a]"
            >
              Generate NFT
            </Button>
          )}
          <RecentMemes memes={memes} />
        </div>
      </div>
    </div>
  );
};

export default socketConnect(Meme);
