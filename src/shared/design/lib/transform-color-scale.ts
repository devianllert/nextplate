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

export const transformColorScale = <T extends string>(scale: Record<string, string>, name?: T): Record<T extends string ? `${T}${ScaleKeys}` : ScaleKeys, string> => {
  const mappedObject = {};

  Object.keys(scale).forEach((value, index) => {
    const number = index + 1;

    mappedObject[name ? `${name}${number}` : number] = scale[value];
  });

  return mappedObject as Record<T extends string ? `${T}${ScaleKeys}` : ScaleKeys, string>;
};
