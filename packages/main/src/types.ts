import type { ImageSourceData } from '@swiftpost/elysium/ui/Image';

export interface CustomConfig {
  author: {
    name: string;
    email: string;
  };
}

export interface PostData {
  title: string;
  content: string;
  date: string;
  image?: string | ImageSourceData;
  author?: {
    name: string;
  };
}
