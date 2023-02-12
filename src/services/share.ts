import qs from "qs";

export interface PageParams {
  before?: number;
  after?: number;
  per_page?: number;
}

export const fetchLatestShare = async () => {
  const res = await fetch(`${process.env.API_HOST}/api/v1/share/latest`, {
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
    `${process.env.API_HOST}/api/v1/share?${qs.stringify(params)}`,
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
    `${process.env.API_HOST}/api/v1/share/${slug}`,
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