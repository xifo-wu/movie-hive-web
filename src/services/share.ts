import qs from "qs";

export interface PageParams {
  before?: number;
  after?: number;
  per_page?: number;
}

export const fetchLatestShare = async () => {
  const res = await fetch(`${process.env.API_HOST}/api/v1/share/latest`, { next: { revalidate: 60 } });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch latest share data");
  }

  return res.json();
};


export const fetchShare = async (params: PageParams) => {
  // params
  const res = await fetch(`${process.env.API_HOST}/api/v1/share`, { next: { revalidate: 60 } });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch latest share data");
  }

  return res.json();
};
