const rgba2decimal = (RGBAColor) => {
  const rgba = RGBAColor.match(/\.?\d+/g);
  const red = +rgba[0];
  const green = +rgba[1];
  const blue = +rgba[2];
  const alpha = +rgba[3] || 1;
  const hex_alpha = (Math.round(alpha * 255)).toString(16);
  const hex_red = red.toString(16);
  const hex_green = green.toString(16);
  const hex_blue = blue.toString(16);
  const hex = `${hex_alpha}${hex_red}${hex_green}${hex_blue}`;
  const decimal = parseInt(hex, 16);
  console.log(RGBAColor, hex, decimal);
}