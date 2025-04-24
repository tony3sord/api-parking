export const saveLogs = async (
  method: string,
  url: string,
  statusCode: number,
  duration: number,
) => {
  console.error(method, url, statusCode, duration);
};
