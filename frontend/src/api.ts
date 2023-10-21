const BASE_URL = "http://localhost:8000/crime";

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

export async function getCrimeData(): Promise<string> {
  const url = `${BASE_URL}/get-crime-data/`

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Unknown error getting crime data")
  }

  return response.json();
}
