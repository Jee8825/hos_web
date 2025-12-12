import banner1 from '../assets/images/banner_1.png';
import banner2 from '../assets/images/banner_2.png';
import banner3 from '../assets/images/banner_3.png';

const banners = [banner1, banner2, banner3];

export const getRandomBanner = () => {
  const randomIndex = Math.floor(Math.random() * banners.length);
  return banners[randomIndex];
};
