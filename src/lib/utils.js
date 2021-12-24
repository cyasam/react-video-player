export const formatVideoTime = (time) => {
  const allTimeStr = new Date(time * 1000).toISOString().substr(11, 8);
  const allTime = allTimeStr.split(':');

  const hours = allTime[0];
  const minutes = allTime[1];
  const seconds = allTime[2];

  const resultTime = [];

  if (parseInt(hours) > 0) {
    resultTime.push(parseInt(hours).toString());
  }
  if (parseInt(minutes) < 10 && parseInt(hours) > 0) {
    resultTime.push('0' + parseInt(minutes).toString());
  } else {
    resultTime.push(parseInt(minutes).toString());
  }
  resultTime.push(seconds);

  return resultTime.join(':');
};
