const formatChain = (number: number = 250) =>
  `0x${Number(number).toString(16)}`;

export const network =
  process.env.NODE_ENV !== "production" ? formatChain(4002) : formatChain();
