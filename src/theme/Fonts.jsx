import Colors from './Colors';

const type = {
  robotoBold: 'Roboto-Bold',
  robotoMedium: 'Roboto-Medium',
  robotoRegular: 'Roboto-Regular',
  robotoLight: 'Roboto-Light',
};

const size = {
  h1: 20,
  h2: 18,
  regular: 15,
  small: 13,
};

const style = {
  h1: {
    fontFamily: type.robotoBold,
    fontSize: size.h1,
  },
  h1Regular: {
    fontFamily: type.robotoRegular,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: type.robotoRegular,
    fontSize: size.h2,
  },
  titleBold: {
    fontFamily: type.robotoBold,
    fontSize: size.regular,
  },
  titleRegular: {
    fontFamily: type.robotoRegular,
    fontSize: size.regular,
  },
  titleSmallBold: {
    fontFamily: type.robotoBold,
    fontSize: size.small,
  },
  titleSmallRegular: {
    fontFamily: type.robotoRegular,
    fontSize: size.small,
  },
  buttonTitle: {
    fontFamily: type.robotoRegular,
    fontSize: size.regular,
  },
};

export default { type, size, style };
