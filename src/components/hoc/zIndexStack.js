import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import withProps from 'recompose/withProps';
import withContext from 'recompose/withContext';

export default (zIndexStack = initialZIndex => (
  compose(
    getContext({
      uiZIndex: PropTypes.number,
    }),
    withProps({
      zIndex: (uiZIndex || 0) + initialZIndex,
    })
  ),
  withContext(
    {
      uiZindex: PropTypes.number,
    },
    ({ zIndex }) => ({
      uiZindex: zIndex,
    })
  )
));
