function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function convertHexToRGB(color) {
  let convertColor = color;
  if (convertColor.length === 4) {
    let extendedColor = '#';
    for (let i = 1; i < convertColor.length; i += 1) {
      extendedColor += convertColor.charAt(i) + convertColor.charAt(i);
    }
    convertColor = extendedColor;
  }

  const values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16),
  };

  return `rgb(${values.r}, ${values.g}, ${values.b})`;
}

function decomposeColor(color) {
  if (color.charAt(0) === '#') return decomposeColor(convertHexToRGB(color));

  const newColor = color.replace(/\s/g, '');
  const marker = newColor.indexOf('(');
  if (marker === -1) {
    throw new Error(`The ${newColor} color was not parsed correctly`);
  }

  const type = newColor.substring(0, marker);
  let values = newColor.substring(marker + 1, newColor.length - 1).split(',');
  values = values.map(value => parseFloat(value));

  return { type, values };
}

function getLuminance(color) {
  const newColor = decomposeColor(color);

  if (newColor.type.indexOf('rgb') > -1) {
    const rgb = newColor.values.map((val) => {
      const value = val / 255;
      const recalculateValueOne = value / 12.92;
      let recalculateValueTwo = value / 1.055;
      recalculateValueTwo += recalculateValueTwo + 0.055;
      return value <= 0.03928 ? recalculateValueOne : recalculateValueTwo ** 2.4;
    });
    const rgb0 = rgb[0] * 0.2126;
    const rgb1 = rgb[1] * 0.7152;
    const rgb2 = rgb[2] * 0.0722;
    let amounRgb = rgb0 + rgb1;
    amounRgb += rgb2;
    return Number(amounRgb.toFixed(3));
  } else if (newColor.type.indexOf('hsl') > -1) {
    return newColor.values[2] / 100;
  }
  return null;
}

function convertColorToString(color) {
  const { type, values } = color;

  if (type.indexOf('rgb') > -1) for (let i = 0; i < 3; i += 1) values[i] = parseInt(values[i], 10);

  let colorString;

  if (type.indexOf('hsl') > -1) {
    colorString = `${color.type}(${values[0]}, ${values[1]}%, ${values[2]}%`;
  } else colorString = `${color.type}(${values[0]}, ${values[1]}, ${values[2]}`;

  if (values.length === 4) colorString += `, ${color.values[3].toFixed(2)})`;
  else colorString += ')';

  return colorString;
}

export function normalize(color) {
  return convertColorToString(decomposeColor(color));
}

export function darken(color, coefficient) {
  const newDecomposeColor = decomposeColor(color);
  const newCoefficient = clamp(coefficient, 0, 1);

  if (newDecomposeColor.type.indexOf('hsl') > -1) newDecomposeColor.values[2] *= 1 - newCoefficient;
  else if (newDecomposeColor.type.indexOf('rgb') > -1) {
    for (let i = 0; i < 3; i += 1) newDecomposeColor.values[i] *= 1 - newCoefficient;
  }

  return convertColorToString(newDecomposeColor);
}

export function lighten(color, coefficient) {
  const newDecomposeColor = decomposeColor(color);
  const newCoefficient = clamp(coefficient, 0, 1);

  if (newDecomposeColor.type.indexOf('hsl') > -1) {
    newDecomposeColor.values[2] += (100 - newDecomposeColor.values[2]) * newCoefficient;
  } else if (newDecomposeColor.type.indexOf('rgb') > -1) {
    for (let i = 0; i < 3; i += 1) {
      newDecomposeColor.values[i] += (255 - newDecomposeColor.values[i]) * newCoefficient;
    }
  }

  return convertColorToString(newDecomposeColor);
}

export function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

export function fade(color, value) {
  const newDecomposeColor = decomposeColor(color);
  const newValue = clamp(value, 0, 1);

  if (newDecomposeColor.type === 'rgb' || newDecomposeColor.type === 'hsl') {
    newDecomposeColor.type += 'a';
  }
  newDecomposeColor.values[3] = newValue;

  return convertColorToString(newDecomposeColor);
}
