import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#05753c',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;