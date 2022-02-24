import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  // loading message
  const [isLoaded, setIsLoaded] = useState(true);
  // error
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // LECTURE to use async/await inside of use effect we need to create separete function like this becouse useEffect expect a cleanup function which is not asynchrounous
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-app-487df-default-rtdb.firebaseio.com/meals.json'
      );
      const responseData = await response.json();
      // TODO we re getting nested object from firebase(firebase specific) and we want it to be an array

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      // loading message
      setIsLoaded(false);
    };

    //LECTURE cant use try catch cuz it will expect a promise and we cant use asnyc on useEffect. So we have to use traditional approach with catching that error
    fetchMeals().catch(error => {
      setIsLoaded(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoaded) {
    return (
      <section className={classes.meals}>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.meals}>
        <p className={classes.loading}>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
