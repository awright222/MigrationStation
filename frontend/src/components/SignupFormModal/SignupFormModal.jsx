import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import styles from './SignupFormModal.module.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!firstName) newErrors.firstName = 'First name is required.';
    if (!lastName) newErrors.lastName = 'Last name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (Object.keys(newErrors).length > 0) {
      dispatch(sessionActions.setSessionErrors(newErrors));
      return;
    }

    try {
      await dispatch(sessionActions.signup({ username, firstName, lastName, email, password }));
      closeModal();
    } catch (error) {
      // Handle errors if needed
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.signupFormContainer} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.signupFormTitle}>Sign Up</h1>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
            <input
              id="username"
              name="username"
              className={styles.formInput}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
            <input
              id="firstName"
              name="firstName"
              className={styles.formInput}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
            <input
              id="lastName"
              name="lastName"
              className={styles.formInput}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            <input
              id="email"
              name="email"
              className={styles.formInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            <input
              id="password"
              name="password"
              className={styles.formInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.formButton} type="submit">Sign Up</button>
          {errors.general && <p className={styles.errorMessage}>{errors.general}</p>}
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;