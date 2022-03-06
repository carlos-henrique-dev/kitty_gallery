import Card from '../components/Card';
import { useContextState } from '../context/ContextProvider';

function Index() {
  const context = useContextState();

  const isFavorite = (imageId: number) => {
    return context.favorites.find((id) => id === imageId) !== undefined;
  };

  const renderCards = () => {
    return context.images.map((image) => {
      return <Card imageInfo={image} key={image.image_id} isFavorite={isFavorite(image.image_id)} />;
    });
  };

  return <div className="gallery">{renderCards()}</div>;
}

export default Index;
