type ScaleKeys = '1'
| '2'
| '3'
| '4'
| '5'
| '6'
| '7'
| '8'
| '9'
| '10'
| '11'
| '12';

export const transformColorScale = (scale: Record<string, string>, name?: string): Record<ScaleKeys | `${typeof name}${ScaleKeys}`, string> => {
  const mappedObject = {};

  Object.keys(scale).forEach((value, index) => {
    const number = index + 1;

    mappedObject[name ? `${name}${number}` : number] = scale[value];
  });

  return mappedObject;
};
