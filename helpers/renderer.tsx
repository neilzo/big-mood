import 'react-native';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

export const createComponent = (component: any) => {
  return renderer.create(component);
};

// export const createComponentWithRedux = (children: any, props = {}) => {
//   return renderer.create(<Provider {...props}>{children}</Provider>);
// };
