import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetails, editSpot } from '../../store/spots';
import styles from './EditSpotForm.module.css';

function EditSpotForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    images: ['', '', '', '', '']
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const spotDetails = await dispatch(fetchSpotDetails(spotId));
      setFormData({
        country: spotDetails.country || '',
        address: spotDetails.address || '',
        city: spotDetails.city || '',
        state: spotDetails.state || '',
        lat: spotDetails.lat || '',
        lng: spotDetails.lng || '',
        description: spotDetails.description || '',
        name: spotDetails.name || '',
        price: spotDetails.price || '',
        previewImage: spotDetails.previewImage || '',
        images: spotDetails.images || ['', '', '', '', '']
      });
    };

    fetchData();
  }, [dispatch, spotId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { country, address, city, state, lat, lng, description, name, price, previewImage, images } = formData;
  
    const updatedSpot = {
      id: spotId,
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
      previewImage,
      images: images.filter(img => img)
    };
  
    try {
      await dispatch(editSpot(updatedSpot));
      navigate(`/spots/${spotId}`);
    } catch (err) {
      console.error('Error updating spot:', err);
      setErrors(err.errors || {});
    }
  };

  return (
    <div className={styles.editSpotFormContainer}>
      <div className={styles.editSpotFormBox}>
        <form onSubmit={handleSubmit} className={styles.editSpotForm}>
          <h1>Edit Spot</h1>
          <div className={styles.formSection}>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            {errors.country && <p className={styles.error}>{errors.country}</p>}
            <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
            {errors.address && <p className={styles.error}>{errors.address}</p>}
            <input name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} />
            {errors.city && <p className={styles.error}>{errors.city}</p>}
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            {errors.state && <p className={styles.error}>{errors.state}</p>}
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            {errors.lat && <p className={styles.error}>{errors.lat}</p>}
            <input name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} />
            {errors.lng && <p className={styles.error}>{errors.lng}</p>}
            <input name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} />
          </div>
          <div className={styles.formSection}>
            <h2>Describe your place to guests</h2>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
            {errors.description && <p className={styles.error}>{errors.description}</p>}
            <textarea name="description" placeholder="Please write at least 30 characters" value={formData.description} onChange={handleChange} />
          </div>
          <div className={styles.formSection}>
            <h2>Create a title for your spot</h2>
            <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            <input name="name" placeholder="Name of your spot" value={formData.name} onChange={handleChange} />
          </div>
          <div className={styles.formSection}>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            {errors.price && <p className={styles.error}>{errors.price}</p>}
            <input name="price" type="number" placeholder="Price per night (USD)" value={formData.price} onChange={handleChange} />
          </div>
          <div className={styles.formSection}>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
            {errors.previewImage && <p className={styles.error}>{errors.previewImage}</p>}
            <input name="previewImage" placeholder="Preview Image URL" value={formData.previewImage} onChange={handleChange} />
            {formData.images.map((image, index) => (
              <div key={index}>
                {errors[`images[${index}]`] && <p className={styles.error}>{errors[`images[${index}]`]}</p>}
                <input placeholder="Image URL" value={image} onChange={(e) => handleImageChange(index, e.target.value)} />
              </div>
            ))}
          </div>
          <button type="submit">Update Spot</button>
        </form>
      </div>
    </div>
  );
}

export default EditSpotForm;