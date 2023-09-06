export const regexEmail =
  /^[a-z0-9]+((\.[a-z0-9]+)|(\-[a-z0-9]+)|(\_[a-z0-9]+))*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;

export const regexValidPass =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
