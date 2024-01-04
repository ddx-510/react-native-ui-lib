import React from 'react';
import Text from "../text";
import GradientSlider from "./GradientSlider";
const ColorSlider = props => {
  const {
    labels = {
      hue: 'Hue',
      lightness: 'Lightness',
      saturation: 'Saturation',
      default: ''
    },
    type,
    sliderContainerStyle,
    showLabels,
    labelsStyle,
    accessible,
    migrate,
    initialColor
  } = props;
  return <>
      {showLabels && labels && <Text recorderTag={'unmask'} $textNeutral text80 style={labelsStyle} accessible={accessible}>
          {labels[type]}
        </Text>}
      <GradientSlider color={initialColor} type={type} containerStyle={sliderContainerStyle} accessible={accessible} migrate={migrate} />
    </>;
};
export default ColorSlider;