export const getFirstName = (name) => {
  const firstName = name.split(" ");
  return firstName[0];
};

export const getRank = (score) => {
  if (score < 500) {
    return "amateur";
  } else if (score < 1000) {
    return "beginner";
  } else if (score < 1500) {
    return "pro";
  } else if (score < 2000) {
    return "master";
  } else if (score < 2500) {
    return "virtuoso";
  } else if (score < 3000) {
    return "grandmaster";
  } else {
    return "legend";
  }
};

export const getGoalScore = (score) => {
  if (score < 500) {
    return 500;
  } else if (score < 1000) {
    return 1000;
  } else if (score < 1500) {
    return 1500;
  } else if (score < 2000) {
    return 2000;
  } else if (score < 2500) {
    return 2500;
  } else if (score < 3000) {
    return 3000;
  } else {
    return 0;
  }
};

export const getWinrate = (amountWon, amountPlayed) => {
  if (amountPlayed === 0) {
    return "0";
  }
  return Math.round((amountWon / amountPlayed) * 100);
};

export const getJoinedDate = (createdAt) => {
  return createdAt.split("T")[0];
};
