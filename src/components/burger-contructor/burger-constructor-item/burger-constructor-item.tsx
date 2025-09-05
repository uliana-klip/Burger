import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import type { TItem } from '@/types';

import styles from './burger-constructor-item.module.css';

type TProps = {
  item: TItem;
  index: number;
  handleClose: (uid: string) => void;
  moveIngredient: (fromIndex: number, toIndex: number) => void;
};

export const BurgerConstructorItem = ({
  item,
  index,
  handleClose,
  moveIngredient,
}: TProps): React.JSX.Element | null => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: { uid: item.uid, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: ['sort'],
    hover: (draggedItem: { uid: string; index: number }) => {
      if (draggedItem.index === index) return;
      moveIngredient(draggedItem.index, index);
      draggedItem.index = index;
    },
  });
  return (
    <div
      ref={(node) => {
        dragRef(dropRef(node));
      }}
    >
      <div
        className={styles.burger_constructor_items}
        style={{ minWidth: '500px', opacity: isDragging ? 0.5 : 1 }}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          handleClose={() => {
            if (item.uid) handleClose(item.uid);
          }}
          price={item.price}
          text={item.name}
          thumbnail={item.image}
        />
      </div>
    </div>
  );
};
