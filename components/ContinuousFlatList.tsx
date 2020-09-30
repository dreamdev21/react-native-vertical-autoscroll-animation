import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { FlatList, FlatListProps } from "react-native";

const ContinuousFlatList: FunctionComponent<FlatListProps<any>> = ({
  ...props
}) => {
  const dY = 1;
  const frameSize = 3; // Control Speed
  const scrollView = useRef<FlatList<any>>(null);
  const interval = useRef(-1);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const height = contentHeight - layoutHeight;

  const createInterval = useCallback(
    (y = 0) =>
      setInterval(() => {
        if (y >= height) {
          y = 0;
          scrollView.current?.scrollToOffset({ offset: y, animated: false });
        } else if (y <= height) {
          y += dY;
          scrollView.current?.scrollToOffset({ offset: y, animated: false });
        }
      }, frameSize),
    [height]
  );

  useEffect(() => {
    if (height === 0) return;
    setTimeout(() => {
      clearInterval(interval.current);
      interval.current = -1;
      interval.current = createInterval();
    }, 300);
  }, [height, createInterval]);

  return (
    <FlatList
      ref={scrollView}
      scrollEventThrottle={16}
      onScrollBeginDrag={() => {
        clearInterval(interval.current);
        interval.current = -1;
      }}
      onMomentumScrollEnd={({
        nativeEvent: {
          contentOffset: { y },
        },
      }) => {
        interval.current = createInterval(y);
      }}
      onLayout={(event: Event) => {
        setLayoutHeight(event.nativeEvent.layout.height);
      }}
      onContentSizeChange={(w: number, h: number) => {
        setContentHeight(h);
      }}
      bounces={false}
      {...props}
    />
  );
};

export default ContinuousFlatList;
