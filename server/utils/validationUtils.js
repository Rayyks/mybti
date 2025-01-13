// validationUtils.js
export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

export const isValidMBTI = (mbti) => {
  const validTypes = [
    "INTJ",
    "INFP",
    "ENTP",
    "ISFJ",
    "ISTJ",
    "ENFJ",
    "ISTP",
    "ISFP",
    "ENFP",
    "INFJ",
    "ESTJ",
    "ESFP",
    "ESTP",
    "ESFJ",
    "INTP",
    "ENTJ",
  ];
  return validTypes.includes(mbti);
};
