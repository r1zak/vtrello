const ERROR_CODES = {
  "auth/user-not-found": "Email not found",
  "auth/wrong-password": "Invalid password",
  "auth/email-already-in-use": "Email already in use",
  "auth/invalid-email": "Invalid email",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/weak-password": "Weak password",
  auth: "Please login",
};

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : "Something went wrong";
}
