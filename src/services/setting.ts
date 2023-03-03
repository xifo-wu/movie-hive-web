import { API_HOST } from './constant';

export const fetchSystemSetting = async () => {
  const res = await fetch(`${API_HOST}/api/v1/pubilc/system-setting`, {
    next: { revalidate: 60 },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch latest share data");
    return res.json();
  }

  return res.json();
};
