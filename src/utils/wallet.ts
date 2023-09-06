export const shortAddress = (address: string) => {
  if (!address) return "";
  if (address.length > 14) {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 6)
    );
  }
  return address;
};
