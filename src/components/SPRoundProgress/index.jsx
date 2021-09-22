import React from 'react';
import PropTypes from 'prop-types';
import StyledProgress from './StyledComponents';
import { Colors, Fonts } from '../../theme';

function SPRoundProgress({ progress, type, width, fontSize, format }) {
  let backColor = Colors.backgroundGray;
  let color = {
    '0%': Colors.progressSuccessEnd,
    '100%': Colors.progressSuccessEnd,
  };

  switch (type) {
    case 'danger': {
      color = {
        '0%': Colors.progressDangerStart,
        '100%': Colors.progressDangerEnd,
      };

      backColor = Colors.progressDangerBackColor;

      break;
    }
    case 'warning': {
      color = {
        '0%': Colors.progressWarnStart,
        '100%': Colors.progressWarnEnd,
      };
      backColor = Colors.progressWarnBackColor;
      break;
    }

    case 'success': {
      color = {
        '0%': Colors.progressSuccessStart,
        '100%': Colors.progressSuccessEnd,
      };
      backColor = Colors.progressSuccessBackColor;
      break;
    }

    default: {
      color = {
        '0%': Colors.progressSuccessEnd,
        '100%': Colors.progressSuccessEnd,
      };
      backColor = Colors.progressSuccessBackColor;
    }
  }
  let widthPx = 40;
  if (width) {
    widthPx = parseInt(width, 10);
  }


  if(progress >= 67){
    color = {
      '0%': Colors.progressSuccessEnd,
      '100%': Colors.progressSuccessEnd,
    };
  }
  else if(progress >= 34 &&  progress  < 67 ){
    color = {
      '0%': Colors.progressWarnStart,
      '100%': Colors.progressWarnEnd,
    };
  }
  else if(progress >= 0 &&  progress  < 34 ){
    color = {
      '0%': Colors.progressDangerStart,
      '100%': Colors.progressDangerEnd,
    };
  }

  return (
    <StyledProgress
      type="circle"
      percent={progress}
      width={widthPx}
      strokeColor={color}
      strokeWidth={10}
      format={() => {
        if (format) {
          return format;
        }
        return progress;
      }}
      backColor={backColor}
      fontSize={fontSize}
    />
  );
}

export default SPRoundProgress;

SPRoundProgress.propTypes = {
  progress: PropTypes.number,
  type: PropTypes.string,
  fontSize: PropTypes.string,
};
