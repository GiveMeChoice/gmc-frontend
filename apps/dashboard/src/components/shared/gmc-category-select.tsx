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

const GmcCategorySelect: React.FC<Props> = ({ category }) => {
  const dataDispatch = useScreenDataDispatch();
  const { gmcCategorySelect } = useMasterData();
  const [editing, setEditing] = useState(false);
  const [selectedGmcCategoryId, setSelectedGmcCategoryId] = useState(
    category.gmcCategoryId
  );

  useEffect(() => {
    setSelectedGmcCategoryId(
      category.gmcCategoryId ? category.gmcCategoryId : ''
    );
  }, [category]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setSelectedGmcCategoryId(
      category.gmcCategoryId ? category.gmcCategoryId : ''
    );
  };
  const onSave = () => {
    setEditing(false);
    merchantCategoriesService
      .assignGmcCategory(
        category.id,
        selectedGmcCategoryId === '-----' ? null : selectedGmcCategoryId
      )
      .then((updated) => {
        dataDispatch({
          type: 'SCREEN_UPDATE_MERCHANT_CATEGORY',
          value: updated,
        });
      });
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-x-1 p-3">
      <label htmlFor="group" className="text-center text-xs text-gray-900">
        GMC Category
      </label>
      <select
        id="group"
        className={cn(
          'mr-2 block w-full rounded-lg border-2 bg-gray-700 p-2.5 text-center text-xs text-white placeholder-secondary-dark-10 focus:border-blue-500 focus:ring-blue-500',
          {
            'border-gmc-forest': !!category.gmcCategoryId,
            'border-gmc-heart-dark-10': !category.gmcCategoryId,
          }
        )}
        disabled={!editing}
        value={selectedGmcCategoryId}
        onChange={(e) => setSelectedGmcCategoryId(e.target.value)}
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
  );
};

export default GmcCategorySelect;
