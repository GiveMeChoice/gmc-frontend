import { useMasterData } from '@root/context-providers/master-data.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import merchantLabelsService, {
  IMerchantLabel,
} from '@root/services/merchant-labels.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';

interface Props {
  label: IMerchantLabel;
}

const GmcLabelSelect: React.FC<Props> = ({ label }) => {
  const dataDispatch = useScreenDataDispatch();
  const { gmcLabelSelect } = useMasterData();
  const [editing, setEditing] = useState(false);
  const [selectedGmcLabelId, setSelectedGmcLabelId] = useState(
    label.gmcLabelId
  );

  useEffect(() => {
    setSelectedGmcLabelId(label.gmcLabelId ? label.gmcLabelId : '');
  }, [label]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setSelectedGmcLabelId(label.gmcLabelId ? label.gmcLabelId : '');
  };
  const onSave = () => {
    setEditing(false);
    merchantLabelsService
      .assignGmcLabel(
        label.id,
        selectedGmcLabelId === '-----' ? null : selectedGmcLabelId
      )
      .then((updated) => {
        dataDispatch({
          type: 'SCREEN_UPDATE_MERCHANT_LABEL',
          value: updated,
        });
      });
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-x-1 p-3">
      <label htmlFor="group" className="text-center text-xs text-gray-900">
        GMC Label
      </label>
      <select
        id="group"
        className={cn(
          'mr-2 block w-full rounded-lg border-2 bg-gray-700 p-2.5 text-center text-xs text-white placeholder-secondary-dark-10 focus:border-blue-500 focus:ring-blue-500',
          {
            'border-gmc-forest': !!label.gmcLabelId,
            'border-gmc-heart-dark-10': !label.gmcLabelId,
          }
        )}
        disabled={!editing}
        value={selectedGmcLabelId}
        onChange={(e) => setSelectedGmcLabelId(e.target.value)}
      >
        <option value="">-----</option>
        {gmcLabelSelect}
        {/* {gmcLabelSelect.map((group, i) => (
            <option key={i} value={group.id}>
              {group.name}
            </option>
          ))} */}
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

export default GmcLabelSelect;
