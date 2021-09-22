import { concat, filter } from 'lodash';

export const onChangeFilters = (
  item,
  selected,
  filterFromArray,
  selectedFilters
) => {
  let newItems = [];
  if (item == 'all') {
    if (!selected) filterFromArray.map(item => newItems.push(item.key));
    else newItems = [];
  } else
    newItems = selected
      ? filter(selectedFilters, filterKey => {
        return filterKey !== item && filterKey != 'all';
      })
      : concat(selectedFilters, item);
  const filterItems = filterFromArray.filter(
    key => !newItems.includes(key.key)
  );
  if (filterItems.length == 1) {
    if (filterItems[0].key == 'all') {
      newItems.push('all');
    }
  }
  return newItems;
};
