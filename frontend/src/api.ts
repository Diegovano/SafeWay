const BASE_URL = "http://localhost:8000/general";

export async function getTest(): Promise<any> {
  const url = `${BASE_URL}/test/`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Unknown error");
  }

  return response.json();
}
