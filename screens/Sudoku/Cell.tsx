import { Text, TextStyle, useWindowDimensions } from 'react-native';

export const Cell = ({
  cellStyle,
  value,
}: {
  cellStyle: TextStyle;
  value: number;
}) => {
  const { width } = useWindowDimensions();

  const cellSize = (width - 11) / 9;

  return (
    <Text
      style={{
        ...cellStyle,
        height: cellSize,
        width: cellSize,
        fontSize: cellSize / 2,
        paddingTop: cellSize / 8,
        textAlign: 'center',
      }}
    >
      {value}
    </Text>
  );
};
