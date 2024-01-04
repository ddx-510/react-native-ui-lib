import _isEmpty from "lodash/isEmpty";
import React, { useCallback, useEffect, useState } from 'react';
import { Colors } from "../../style";
import { asBaseComponent, forwardRef } from "../../commons/new";
import Slider from "./index";
import { Slider as NewSlider } from "../../incubator";
import asSliderGroupChild from "./context/asSliderGroupChild";
import Gradient from "../gradient";
export let GradientSliderTypes = /*#__PURE__*/function (GradientSliderTypes) {
  GradientSliderTypes["DEFAULT"] = "default";
  GradientSliderTypes["HUE"] = "hue";
  GradientSliderTypes["LIGHTNESS"] = "lightness";
  GradientSliderTypes["SATURATION"] = "saturation";
  return GradientSliderTypes;
}({});

// Fixes typing errors with the old slider.

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/GradientSlider/GradientSlider.gif?raw=true
 */
const GradientSlider = props => {
  const {
    type = GradientSliderTypes.DEFAULT,
    gradientSteps = 120,
    color: propsColors = Colors.$backgroundPrimaryHeavy,
    sliderContext,
    onValueChange: _onValueChange,
    migrate,
    containerStyle,
    disabled,
    accessible,
    forwardedRef,
    ...others
  } = props;
  const [initialColor] = useState(Colors.getHSL(propsColors));
  const [color, setColor] = useState(Colors.getHSL(propsColors));
  useEffect(() => {
    setColor(Colors.getHSL(propsColors));
  }, [propsColors]);
  const getColor = useCallback(() => {
    return color || sliderContext.value;
  }, [color, sliderContext.value]);
  const renderDefaultGradient = useCallback(() => {
    const color = getColor();
    return <Gradient color={color} numberOfSteps={gradientSteps} />;
  }, [getColor, gradientSteps]);
  const renderHueGradient = useCallback(() => {
    return <Gradient type={Gradient.types.HUE} numberOfSteps={gradientSteps} />;
  }, [gradientSteps]);
  const renderLightnessGradient = useCallback(() => {
    const color = getColor();
    return <Gradient type={Gradient.types.LIGHTNESS} color={color} numberOfSteps={gradientSteps} />;
  }, [getColor, gradientSteps]);
  const renderSaturationGradient = useCallback(() => {
    const color = getColor();
    return <Gradient type={Gradient.types.SATURATION} color={color} numberOfSteps={gradientSteps} />;
  }, [getColor, gradientSteps]);
  const onValueChange = useCallback((value, alpha) => {
    // alpha returns for type.DEFAULT
    _onValueChange?.(value, alpha);
  }, [_onValueChange]);
  const updateColor = useCallback(color => {
    if (!_isEmpty(sliderContext)) {
      sliderContext.setValue?.(color);
    } else {
      setColor(color);
      const hex = Colors.getHexString(color);
      onValueChange(hex, color.a);
    }
  }, [sliderContext, onValueChange]);
  const reset = useCallback(() => {
    updateColor(initialColor);
  }, [initialColor, updateColor]);
  const updateAlpha = useCallback(a => {
    const color = getColor();
    updateColor({
      ...color,
      a
    });
  }, [getColor, updateColor]);
  const updateHue = useCallback(h => {
    const color = getColor();
    updateColor({
      ...color,
      h
    });
  }, [getColor, updateColor]);
  const updateLightness = useCallback(l => {
    const color = getColor();
    updateColor({
      ...color,
      l
    });
  }, [getColor, updateColor]);
  const updateSaturation = useCallback(s => {
    const color = getColor();
    updateColor({
      ...color,
      s
    });
  }, [getColor, updateColor]);
  const _color = getColor();
  const thumbTintColor = Colors.getHexString(_color);
  let step = 0.01;
  let maximumValue = 1;
  let value = color.a;
  let renderTrack = renderDefaultGradient;
  let sliderOnValueChange = updateAlpha;
  switch (type) {
    case GradientSliderTypes.HUE:
      step = 1;
      maximumValue = 359;
      value = initialColor.h;
      renderTrack = renderHueGradient;
      sliderOnValueChange = updateHue;
      break;
    case GradientSliderTypes.LIGHTNESS:
      value = initialColor.l;
      renderTrack = renderLightnessGradient;
      sliderOnValueChange = updateLightness;
      break;
    case GradientSliderTypes.SATURATION:
      value = initialColor.s;
      renderTrack = renderSaturationGradient;
      sliderOnValueChange = updateSaturation;
      break;
    default:
      break;
  }
  const SliderComponent = migrate ? NewSlider : Slider;
  return <SliderComponent {...others}
  //@ts-expect-error
  ref={forwardedRef} onReset={reset} renderTrack={renderTrack} step={step} maximumValue={maximumValue} value={value} thumbTintColor={thumbTintColor} onValueChange={sliderOnValueChange} containerStyle={containerStyle} disabled={disabled} accessible={accessible} useRange={false} />;
};
GradientSlider.displayName = 'GradientSlider';
GradientSlider.types = GradientSliderTypes;

// eslint-disable-next-line max-len
export default asBaseComponent(forwardRef(asSliderGroupChild(forwardRef(GradientSlider))));