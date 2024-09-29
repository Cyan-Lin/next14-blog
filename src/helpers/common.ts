export const isMobile = () => {
  if (typeof navigator !== "undefined") {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  return false;
};

export const getQueryParamsString = (
  paramsData: { key: string; value?: string }[]
) => {
  const queryParams = new URLSearchParams();

  paramsData.forEach(({ key, value }) => {
    if (value) queryParams.set(key, value);
  });

  return queryParams.toString() ? `&${queryParams.toString()}` : "";
};
