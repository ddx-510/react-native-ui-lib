import { fireEvent } from '@testing-library/react-native';
export const useScrollableDriver = driver => {
  const getContentOffset = async () => await driver.getElement().props.contentOffset;
  const scroll = ({
    x = 0,
    y = 0
  }, options) => {
    fireEvent.scroll(driver.getElement(), {
      nativeEvent: {
        ...options,
        contentOffset: {
          x,
          y
        }
      }
    });
  };
  return {
    ...driver,
    getContentOffset,
    scroll
  };
};