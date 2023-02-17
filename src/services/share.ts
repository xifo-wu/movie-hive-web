import qs from "qs";

const API_HOST = process.env.API_HOST ? process.env.API_HOST : '';

export interface PageParams {
  before?: number;
  after?: number;
  per_page?: number;
}

export const fetchLatestShare = async () => {
  const res = await fetch(`${API_HOST}/api/v1/share/latest`, {
    next: { revalidate: 60 },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch latest share data");
    return res.json()
  }

  return res.json();
};

export const fetchShare = async (params?: PageParams) => {
  const res = await fetch(
    `${API_HOST}/api/v1/share?${qs.stringify(params)}`,
    { next: { revalidate: 60 } }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch latest share data");
    return res.json()
  }

  return res.json()
};

export const fetchShareDetail = async (slug: string) => {
  const res = await fetch(
    `${API_HOST}/api/v1/share/${slug}`,
    { next: { revalidate: 60 } }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch latest share data");
    return undefined;
  }

  return res.json()
}


export const fetchShareSearch = async (params?: { query?: any }) => {
  const res = await fetch(
    `${API_HOST}/api/v1/share/search?${qs.stringify(params)}`,
    { next: { revalidate: 60 } }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch latest share data");
    return res.json()
  }

  return res.json()
};