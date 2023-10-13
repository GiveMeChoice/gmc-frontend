import ActivationSwitch from '@root/components/shared/activation-switch';
import EditableField from '@root/components/shared/editable-field';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import providersService from '@root/services/providers.service';
import { IProvider } from 'gmc-types';
import React, { useState } from 'react';

interface Props {
  provider: IProvider;
}

const EditableProviderFields: React.FC<Props> = ({ provider }) => {
  const screenDataDispatch = useScreenDataDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldSave = (updates: Partial<IProvider>) => {
    setLoading(true);
    providersService
      .update(provider.id, updates)
      .then((updatedProvider) => {
        screenDataDispatch({
          type: 'SCREEN_UPDATE_PROVIDER',
          value: updatedProvider,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-full border-t border-zinc-500">
      <div className="flex h-full w-3/5 flex-col items-center justify-evenly p-4">
        <div>
          <EditableField
            title="Interval (hrs)"
            initialValue={provider.runIntervalHours}
            fieldType="number"
            onSave={(runIntervalHours) => handleFieldSave({ runIntervalHours })}
            loading={loading}
            width="w-16"
          />
          <EditableField
            title="Expiration (hrs)"
            initialValue={provider.expirationHours}
            fieldType="number"
            onSave={(expirationHours) => handleFieldSave({ expirationHours })}
            loading={loading}
            width="w-16"
          />
        </div>
      </div>
      <div className="h-28 w-2/5  border-l border-zinc-500">
        <ActivationSwitch active={provider.active} id={provider.id} />
      </div>
    </div>
  );
};

export default EditableProviderFields;
