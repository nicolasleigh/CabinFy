import { createGlobalStyle } from 'styled-components';

import PoppinsRegular from './Poppins-Regular.ttf';
import PoppinsMedium from './Poppins-Medium.ttf';
import SonoRegular from './Sono-Regular.ttf';
import SonoMedium from './Sono-Medium.ttf';

export default createGlobalStyle`
  @font-face {
  font-family: 'Poppins';
  font-weight: 500;
  src: local('Poppins'), url(${PoppinsRegular}) format('truetype');
  }
  @font-face {
  font-family: 'Poppins';
  font-weight: 600;
  src: local('Poppins'), url(${PoppinsMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Sono';
    font-weight: 500;
    src: local('Sono'), url(${SonoRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Sono';
    font-weight: 600;
    src: local('Sono'), url(${SonoMedium}) format('truetype');
  }
`;
