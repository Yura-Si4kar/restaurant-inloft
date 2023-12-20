export const createBackgroundsColor = (waiters) => {
  let colors = [];

  for (let i = 0; i < waiters.length; i++) {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomHexColor()];
    }

    colors.push(hexColor);

    function getRandomHexColor() {
      return Math.floor(Math.random() * hex.length);
    }
  }

  return colors;
};
