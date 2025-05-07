export const getCorsOptions = () => {
  const devAllowedOrigins = ["http://localhost:3000", "localhost:3000"];
  return {
    origin: devAllowedOrigins,
  };
};
