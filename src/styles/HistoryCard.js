import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view1: {
    width: '100%',
    height: 102,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.03',
    shadowRadius: 40,
    shadowOffset: {width: 0, height: 10},
    flexDirection: 'row',
    marginBottom: 14,
    paddingLeft: 17,
    paddingTop: 8,
    paddingBottom: 9,
    paddingRight: 29,
    borderRadius: 20,
    alignItems: 'center',
  },
  view2: {position: 'absolute', top: '40%', right: 0},
  view3: {},
  text1: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 25.5,
  },
  text2: {
    color: '#895537',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22.5,
  },
  text3: {
    color: '#6A4029',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
  },
  image1: {
    width: 69.21,
    height: 69.21,
    borderRadius: 34.605,
    marginRight: 18.79,
  },
});

export default styles;
