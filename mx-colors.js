import Closest from "https://esm.sh/closestvector";

const colorData = await getColors();
let colorList = [];

async function getColors() {
  const res = await fetch("https://api.color.pizza/v1/").then((x) => x.json());
  const colors = res.colors;

  const closestColors = new Closest(
    res.colors.map((c) => [c.rgb.r, c.rgb.g, c.rgb.b]),
    true
  );

  return { colors, closestColors };
}

function hexToRgb(hex) {
  const int = parseInt(hex.replace("#", ""), 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function filterColorByHex(hexVal) {
  const colval = hexToRgb(hexVal);
  // this.filterString = hexVal;

  // const timer = setTimeout(() => {
  let i = 0;
  const similarColors = [];

  while (i < 60) {
    similarColors.push(
      colorData.colors[
        colorData.closestColors.get([colval.r, colval.g, colval.b]).index
      ]
    );
    i++;
  }

  colorList = similarColors;
  colorData.closestColors.clearCache();
  // }, 100);

  // clearTimeout(timer);

  return colorList;
}

function filterColorByName(colorName) {
  // const pickedColor = "#ffffff";
  const name = colorName.toLowerCase();

  const _colors = colorData.colors.filter((col) => {
    return (
      col.name.toLowerCase().indexOf(name) > -1 || col.hex.indexOf(name) > -1
    );
  });

  colorList = _colors.length
    ? _colors
    : [
        {
          hex: "#f0c",
          rgb: {
            r: 255,
            g: 255,
            b: 255,
          },
          name: `${colorData.colors.length} colors and you can't find any!`,
        },
      ];

  return colorList;
}

// console.log(filterColorByName("abbey"));
console.log(filterColorByHex("#c93"));
// console.log(colorData.closestColors.get([221, 51, 102]));
