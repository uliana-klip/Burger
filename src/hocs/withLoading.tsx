import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import type { TItem, TRootState } from '@/types';
import type { ComponentType } from 'react';

const selectIngredients = (state: TRootState): TItem[] => state.ingredients.ingredients;

const withLoading = <P extends object>(
  WrappedComponent: ComponentType<
    P & { ingredients: ReturnType<typeof selectIngredients> }
  >
): ComponentType<P> => {
  const ComponentWithLoading = (props: P): React.JSX.Element | null => {
    const ingredients = useSelector(selectIngredients);
    const isLoading: boolean = useSelector(
      (state: TRootState) => state.ingredients.ingredientsFulfiled === false
    );

    if (isLoading) {
      return <Preloader />;
    }

    return <WrappedComponent {...props} ingredients={ingredients} />;
  };

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithLoading.displayName = `withLoading(${wrappedName})`;

  return ComponentWithLoading;
};

export default withLoading;
