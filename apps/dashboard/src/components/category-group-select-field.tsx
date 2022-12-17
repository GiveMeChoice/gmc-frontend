import { useDataDispatch } from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import categoriesService, {
  ICategory,
} from '@root/services/categories.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';

interface Props {
  category: ICategory;
}

const CategoryGroupSelectField: React.FC<Props> = ({ category }) => {
  const dataDispatch = useDataDispatch();
  const { options } = useFilters();
  const [editing, setEditing] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(category.groupId);

  useEffect(() => {
    setSelectedGroupId(category.groupId ? category.groupId : '');
  }, [category]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setSelectedGroupId(category.groupId ? category.groupId : '');
  };
  const onSave = () => {
    setEditing(false);
    categoriesService
      .update(category.id, { groupId: selectedGroupId })
      .then((updated) => {
        dataDispatch({ type: 'UPDATE_CATEGORY', value: updated });
      });
  };

  return (
    <div className="flex h-full items-center space-x-1">
      <label
        htmlFor="group"
        className="mr-1 block w-12 text-center text-xs font-medium text-gray-900"
      >
        Category Group
      </label>
      <div className="flex flex-wrap items-center justify-center space-x-1">
        <select
          id="group"
          className={cn(
            'block w-36 min-w-fit rounded-lg border border-gray-600 bg-gray-700 p-1 text-center text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              // 'text-gray-400': !filters.providerActivation,
            }
          )}
          disabled={!editing}
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <option value={null}>-----</option>
          {options.categoryGroupSelect.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
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

export default CategoryGroupSelectField;
