import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import merchantCategoriesService, {
  IMerchantCategory,
} from '@root/services/merchant-categories.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';
import { useMasterData } from '@root/context-providers/master-data.provider';

interface Props {
  category: IMerchantCategory;
}

const CategoryGroupSelectField: React.FC<Props> = ({ category }) => {
  const dataDispatch = useScreenDataDispatch();
  const { gmcCategorySelect } = useMasterData();
  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(category.categoryId);

  useEffect(() => {
    setSelectedId(category.categoryId ? category.categoryId : '');
  }, [category]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setSelectedId(category.categoryId ? category.categoryId : '');
  };
  const onSave = () => {
    setEditing(false);
    merchantCategoriesService
      .assignCategory(category.id, selectedId === '-----' ? null : selectedId)
      .then((updated) => {
        dataDispatch({
          type: 'SCREEN_UPDATE_MERCHANT_CATEGORY',
          value: updated,
        });
      });
  };

  return (
    <div className="flex h-full w-full items-center space-x-1">
      <label
        htmlFor="group"
        className="mx-4 block w-12 text-center text-xs font-medium text-gray-900"
      >
        Linked GMC Category
      </label>
      <div className="flex items-center justify-center space-x-1">
        <select
          id="group"
          className={cn(
            'mr-2 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-center text-sm text-white placeholder-secondary-dark-10 focus:border-blue-500 focus:ring-blue-500',
            {
              // 'text-gray-400': !filters.providerActivation,
            }
          )}
          disabled={!editing}
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value={null}>-----</option>
          {gmcCategorySelect}
        </select>
        <FieldControlButtons
          active={editing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

function getSpacer(spaces) {
  return `${'='.repeat(spaces)}${spaces + 1}>  - `;
}

export default CategoryGroupSelectField;
