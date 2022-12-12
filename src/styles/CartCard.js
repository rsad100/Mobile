import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view1: {width: '100%', flexDirection: 'row', marginBottom: 16.5},
  view2: {
    flexDirection: 'row',
    position: 'absolute',
    width: 49,
    height: 34,
    backgroundColor: '#E0E0E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    bottom: 19.5,
    right: 0,
    paddingLeft: 6,
    paddingRight: 6,
  },
  view3: {},
  text1: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 17,
    lineHeight: 25.5,
  },
  text2: {
    color: '#6A4029',
    fontWeight: '900',
    fontSize: 15,
    lineHeight: 22.5,
    marginBottom: 6,
  },
  text3: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
  text4: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
  image1: {
    width: 99.99,
    height: 108.5,
    borderRadius: 20,
    marginRight: 24.01,
  },
});

export default styles;
