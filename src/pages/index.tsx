import { useEffect, useState } from 'react';
import { GoHome, GoBookmark } from 'react-icons/go';
import Card from '../components/Card';
import ScrollTop from '../components/ScrollTop';
import Tabs from '../components/Tabs';
import { useContextState } from '../context/ContextProvider';
import { ImageInfo } from '../data/images';

const tabs = [
  { index: 0, title: 'Home', icon: <GoHome /> },
  { index: 1, title: 'Favorite', icon: <GoBookmark /> },
];

function Index() {
  const context = useContextState();

  const [tab, setTab] = useState(0);
  const [images, setImages] = useState<ImageInfo[] | []>([]);

  useEffect(() => {
    if (tab === 0) {
      setImages(context.images);
    } else {
      const favorites = context.images.filter((image) =>
        context.favorites.includes(image.image_id)
      );
      setImages(favorites);
    }
  }, [tab, context]);

  const isFavorite = (imageId: number) =>
    context.favorites.find((id) => id === imageId) !== undefined;

  const renderCards = (list: ImageInfo[] | []) => {
    if (!list.length) {
      return (
        <p className="empty-list" data-testid="empty-list">
          Hmmm... <br /> It looks like you don&rsquo;t have any favorite kitty yet 😿
        </p>
      );
    }

    return list.map((image) => {
      return (
        <Card imageInfo={image} key={image.image_id} isFavorite={isFavorite(image.image_id)} />
      );
    });
  };

  return (
    <section className="container" data-testid="container">
      <section className="heading">
        <div className="description">
          <h1>Kitty Gallery</h1>
          <span>A curated selection to brighten your day 😸</span>
        </div>

        <Tabs tabs={tabs} changeTab={setTab} currentTab={tab} />
      </section>
      <section className="gallery">{renderCards(images)}</section>
      <ScrollTop />
    </section>
  );
}

export default Index;
