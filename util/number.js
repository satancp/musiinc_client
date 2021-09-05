const numberFormatter = (num) => {
  if (num < 10000) {
    return num;
  } else if (num < 100000000) {
    return `${Math.floor(num / 10000)}w`;
  } else {
    return '9999w+';
  }
};

export default { numberFormatter };
