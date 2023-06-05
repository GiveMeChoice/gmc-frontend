import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import merchantLabelsService, {
  IMerchantLabel,
} from '@root/services/merchant-labels.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';
import { useMasterData } from '@root/context-providers/master-data.provider';

interface Props {
  label: IMerchantLabel;
}

const LabelGroupSelectField: React.FC<Props> = ({ label }) => {
  const dataDispatch = useScreenDataDispatch();
  const { gmcLabelSelect } = useMasterData();
  const [editing, setEditing] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(label.groupId);

  useEffect(() => {
    setSelectedGroupId(label.groupId ? label.groupId : '');
  }, [label]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setSelectedGroupId(label.groupId ? label.groupId : '');
  };
  const onSave = () => {
    setEditing(false);
    merchantLabelsService
      .update(label.id, { groupId: selectedGroupId })
      .then((updated) => {
        dataDispatch({ type: 'SCREEN_UPDATE_MERCHANT_LABEL', value: updated });
      });
  };

  return (
    <div className="flex h-full items-center space-x-1">
      <label
        htmlFor="group"
        className="block w-10 text-xs font-medium text-gray-900"
      >
        Label Group
      </label>
      <div className="flex flex-wrap items-center justify-center space-x-1">
        <select
          id="group"
          className={cn(
            'block w-44 min-w-fit rounded-lg border border-gray-600 bg-gray-700 p-1 text-center text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              // 'text-gray-400': !filters.providerActivation,
            }
          )}
          disabled={!editing}
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <option value="">-----</option>
          {gmcLabelSelect.map((group, i) => (
            <option key={i} value={group.id}>
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

export default LabelGroupSelectField;
