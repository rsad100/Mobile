import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view1: {
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.03',
    shadowRadius: 40,
    shadowOffset: {width: 0, height: 10},
    flexDirection: 'row',
    marginBottom: 16.5,
    alignItems: 'center',
  },
  view2: {position: 'absolute', top: '40%', right: 0},
  view3: {alignSelf: 'flex-start', flex: 1},
  view4: {},
  text1: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 15,
    lineHeight: 22.5,
  },
  text2: {
    color: 'rgba(106, 64, 41, 1)',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 18,
  },
  text3: {
    color: '#6A4029',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
  text4: {
    color: 'rgba(106, 64, 41, 1)',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  image1: {
    width: 99.88,
    height: 108.5,
    borderRadius: 20,
    marginRight: 25.01,
  },
  btn1: {
    width: 60,
    height: 35,
    backgroundColor: 'rgba(255, 186, 51, 1)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
