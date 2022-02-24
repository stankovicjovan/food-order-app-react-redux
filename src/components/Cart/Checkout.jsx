import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

// helper functions for validation
const isEmpty = value => value.trim() === '';
const isFiveDigits = value => value.trim().length === 5;
//

const Checkout = props => {
  // getting states if some of form is invalid for user feedback
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  // collecting data
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = e => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const streetName = streetInput.current.value;
    const cityName = cityInput.current.value;
    const postalCode = postalInput.current.value;

    // input validations
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(streetName);
    const enteredCityIsValid = !isEmpty(cityName);

    const enteredPostalIsValid = isFiveDigits(postalCode);

    // updating state if any of input is invalid
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    // check overal form is valid
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    // check for errors and give feedback
    if (!formIsValid) {
      return;
    }

    // submit cart data
    props.onConfirm({
      name: enteredName,
      street: streetName,
      city: cityName,
      postalCode: postalCode,
    });
  };

  // control classes function
  const controlClasses = formInputProperty => {
    const nameControlCalsses = `${classes.control} ${
      formInputProperty ? '' : classes.invalid
    }`;

    return nameControlCalsses;
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={controlClasses(formInputsValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {/* checking for validity */}
        {!formInputsValidity.name && (
          <p className={classes.invalid}>Please enter a valid name</p>
        )}
      </div>
      <div className={controlClasses(formInputsValidity.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputsValidity.street && (
          <p className={classes.invalid}>Please enter a valid street</p>
        )}
      </div>
      <div className={controlClasses(formInputsValidity.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!formInputsValidity.postalCode && (
          <p className={classes.invalid}>
            Please enter a valid postal code(5digits)
          </p>
        )}
      </div>
      <div className={controlClasses(formInputsValidity.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputsValidity.city && (
          <p className={classes.invalid}>Please enter a valid city</p>
        )}
      </div>
      {/*LECTURE type button cuz we want him to NOT submit a form */}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
