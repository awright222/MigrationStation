import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import spotsStyles from './Spots.module.css';
import Footer from '../Footer';

const Spots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => state.spots.allSpots || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSpots());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching spots:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleTileClick = (id) => {
    navigate(`/spots/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={spotsStyles.spotsContainer}>
        {spots.map((spot) => (
          <div key={spot.id} className={spotsStyles.spotTileContainer}>
            <div
              className={spotsStyles.spotTile}
              title={spot.name}
              onClick={() => handleTileClick(spot.id)}
            >
              <img src={spot.previewImage} alt={spot.name} className={spotsStyles.spotThumbnail} />
              <div className={spotsStyles.spotInfo}>
                <div>{spot.name}</div>
                <div>
                  <FontAwesomeIcon icon={faStar} /> {spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}
                </div>
                <div>{spot.city}, {spot.state}</div>
                <div>${spot.price} / night</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Spots;