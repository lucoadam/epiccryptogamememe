import { parse } from "node-html-parser";

export default async function handler(req: any, res: any) {
  const address = "0x59315a5F27584bA5D88C547caFE5EA5e1f7C5CA1";
  if (req.method === "GET") {
    let parsed: any = null;
    try {
      const data = await fetch(
        `https://api.zilliqa.com/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "1",
            jsonrpc: "2.0",
            method: "GetSmartContractSubState",
            params: [address, "balances", []],
          }),
        
        }
      ).then((res) => res.json());
      parsed = Object.values(data.result.balances).filter(each=>each !== "0").length;
    } catch (e) {
      console.log(e);
    }
    res.status(200).json({
      message: "Success",
      result: parsed,
    });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
