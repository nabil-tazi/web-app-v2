import React from 'react';
import styles from './filters.module.scss';
import { Selectable } from './Selectable';
import { FiltersProps } from './filters.types';

export const Filters = ({ filterdItems, onClear }: FiltersProps): JSX.Element => {
  return (
    <div className={styles['filters']}>
      <div className={styles['filters__header']}>
        <span className={styles['filters__title']}>Filters</span>
        <span className={styles['filters__clear']} onClick={onClear}>
          clear
        </span>
      </div>
      {filterdItems.map((item) => (
        <>
          {item.visible && (
            <Selectable list={item.list} title={item.title} onEdit={item.onEdit} onRemove={item.onRemove} />
          )}
        </>
      ))}
    </div>
  );
};
