import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const withLoading = (WrappedComponent) => {
  const ComponentWithLoading = () => {
    const ingredients = useSelector((state) => state.ingredients.ingredients);
    const isLoading = useSelector(
      (state) => state.ingredients.ingredientFulfiled === false
    );

    if (isLoading) {
      return <Preloader />;
    }

    return <WrappedComponent ingredients={ingredients} />;
  };

  ComponentWithLoading.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithLoading;
};

export default withLoading;
