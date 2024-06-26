import React from "react";
import toast from "react-hot-toast";

const BuyCoffeeForTeam = () => {
  const ref = React.useRef(null);
  return (
    <div className="mb-4">
      <p className="text-center text-xl">
        Stake on Vali::Meme{" "}
       <a href="https://comstats.org/validator/0/5FTiKLAjfVFaz6u3hgScSAGzTbE9eiVVx892hXbjYQ1QSyLK" target="_blank" rel="noreferrer">
       <span
          className="text-center mt-4 cursor-pointer border-primary border-b-2 p-2"
        >
          5FTiKLAjfVFaz6u3hgScSAGzTbE9eiVVx892hXbjYQ1QSyLK
        </span>
        </a>
      </p>
      <input
        ref={ref}
        type="text"
        className="text-center w-full hidden"
        value="zil1l3g205ehyh2ws5pvaxhuftx2px26z5jyxctjdx"
      />
    </div>
  );
};

export default BuyCoffeeForTeam;
