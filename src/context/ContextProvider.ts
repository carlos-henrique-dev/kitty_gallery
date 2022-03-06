import React, { useState } from 'react';
import { images as RemoteImages, ImageURL } from '../data/images';

type ProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
};

const ContextProvider = ({ children }: ProviderProps) => {
  const [images, setImages] = useState<ImageURL[]>(RemoteImages);

  const [favorites, setFavorites] = useState<ImageURL[] | []>([]);
};

export default ContextProvider;
