import NextImage, {
  StaticImageData as NextStaticImageData,
  ImageProps as NextImageProps,
} from 'next/image';
import { ImgHTMLAttributes } from 'react';

export type StaticImageData = NextStaticImageData;

export interface DynamicImageData {
  src: string;
  width?: ImgHTMLAttributes<HTMLImageElement>['width'];
  height?: ImgHTMLAttributes<HTMLImageElement>['height'];
}

export type ImageSourceData = DynamicImageData | NextStaticImageData;

interface Props extends Omit<NextImageProps, 'src' | 'width' | 'height'> {
  source: string | ImageSourceData;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export const isStaticImageData = (
  data: ImageSourceData | string,
): data is StaticImageData => {
  if (typeof data === 'string') {
    return false;
  }
  const { width, height } = data;
  return typeof width === 'number' && typeof height === 'number';
};

const Image: React.FC<Props> = ({ source, alt, width, height, ...rest }) => {
  // If src is a string and width or height are missing, fallback to <img>
  if (!isStaticImageData(source)) {
    const src = typeof source === 'string' ? source : source.src;
    return <img src={src} alt={alt} {...rest} />;
  }

  // Otherwise, safely use Next.js Image
  return <NextImage src={source} alt={alt} {...rest} />;
};

export type ImageProps = Props;
export default Image;
