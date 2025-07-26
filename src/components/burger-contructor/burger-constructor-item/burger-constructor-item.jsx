import { ingredientPropType } from '@/utils/prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-item.module.css';

export const BurgerConstructorItem = ({ item, index, handleClose, moveIngredient }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: { uid: item.uid, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: ['sort'],
    hover: (draggedItem) => {
      if (draggedItem.index === index) return;
      moveIngredient(draggedItem.index, index);
      draggedItem.index = index;
    },
  });
  return (
    <div ref={(node) => dragRef(dropRef(node))}>
      <div
        className={styles.burger_constructor_items}
        style={{ minWidth: '500px', opacity: isDragging ? 0.5 : 1 }}
      >
        <DragIcon />
        <ConstructorElement
          handleClose={() => handleClose(item.uid)}
          price={item.price}
          text={item.name}
          thumbnail={item.image}
        />
      </div>
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  moveIngredient: PropTypes.func.isRequired,
};
