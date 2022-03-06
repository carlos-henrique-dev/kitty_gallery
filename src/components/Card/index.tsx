import { memo } from 'react';
import { ImageInfo } from '../../data/images';
import { GoArrowRight, GoBookmark } from 'react-icons/go';
import { useContextDispatch } from '../../context/ContextProvider';

type CardProps = {
  imageInfo: ImageInfo;
  isFavorite: boolean;
};

const Card = memo(({ imageInfo, isFavorite }: CardProps) => {
  const { image_id, title, url } = imageInfo;

  const dispatch = useContextDispatch();

  const handleFavorite = () => {
    if (isFavorite) {
      return dispatch({
        type: 'REMOVE_FROM_FAVORITE',
        payload: image_id,
      });
    }
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: image_id,
    });
  };

  return (
    <div className="card" onClick={handleFavorite} data-testid="card">
      <GoBookmark className={`icon bookmark ${isFavorite ? 'show' : ''}`} />

      <img src={url} alt={title} className="image" width="300" height="272" />

      <div className={`info ${isFavorite ? 'favorite' : ''}`}>
        <GoArrowRight className="icon arrow" />
        <p className="title">{title}</p>
      </div>
    </div>
  );
});

export default Card;
