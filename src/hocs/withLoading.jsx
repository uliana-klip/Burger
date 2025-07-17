import { Preloader } from '@krgaa/react-developer-burger-ui-components';

const withLoading = (WrappedComponent) => {
  const ComponentWithLoading = (props) => {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <Preloader />;
    }

    return <WrappedComponent {...rest} />;
  };

  ComponentWithLoading.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithLoading;
};

export default withLoading;
