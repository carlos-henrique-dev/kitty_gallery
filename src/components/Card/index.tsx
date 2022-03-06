import { memo } from 'react';
import { GoArrowRight, GoBookmark } from 'react-icons/go';
import { ImageInfo } from '../../data/images';
import { useContextDispatch } from '../../context/ContextProvider';

type CardProps = {
  imageInfo: ImageInfo;
  isFavorite: boolean;
};

const Card = memo(({ imageInfo, isFavorite }: CardProps) => {
  const { image_id: imageId, title, url } = imageInfo;

  const dispatch = useContextDispatch();

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: 'REMOVE_FROM_FAVORITE',
        payload: imageId,
      });
    }

    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: imageId,
    });
  };

  const handleImageError = ({ currentTarget }: any) => {
    // eslint-disable-next-line no-param-reassign
    currentTarget.onerror = null; // prevents looping

    // eslint-disable-next-line no-param-reassign
    currentTarget.src = './images/404.png';
  };

  return (
    <div
      className="card"
      onClick={handleFavorite}
      onKeyPress={handleFavorite}
      role="none"
      data-testid="card"
    >
      <GoBookmark className={`icon bookmark ${isFavorite ? 'show' : ''}`} />

      <img
        src={url}
        alt={title}
        className="image"
        width="300"
        height="272"
        onError={handleImageError}
      />

      <div className={`info ${isFavorite ? 'favorite' : ''}`}>
        <GoArrowRight className="icon arrow" />
        <p className="title">{title}</p>
      </div>
    </div>
  );
});

export default Card;
