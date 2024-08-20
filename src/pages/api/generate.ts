const backendUrl = process.env.BACKEND_URL;

export default async function handler(req: any, res: any) {
  console.log(req.body);
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const response = await fetch(`${backendUrl}/generate`, {
    method: "POST",
    body: JSON.stringify({
      text: req.body.text,
      cfg_scale: 2,
      height: 1024,
      width: 1024,
      steps: 8,
      engine: "proteus",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return { error: `${response.status} ${response.statusText}` };
    })
    .catch((error) => {
      return { error: error.message || error };
    });

  res
    .status(response?.error ? 400 : 200)
    .json(response?.error ? { error: response.error } : response);
}
