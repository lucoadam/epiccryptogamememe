const backendUrl = process.env.BACKEND_URL;

export default async function handler(req: any, res: any) {
  const response = await fetch(`${backendUrl}/images`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return { error: `${response.status} ${response.statusText}` };
  });

  res.status(200).json(response.error ? { error: response.error } : response);
}
