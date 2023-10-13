import EditableField from '@root/components/shared/editable-field';
import EditableTextArea from '@root/components/shared/editable-text-area';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import merchantsService from '@root/services/merchants.service';
import { IMerchant } from 'gmc-types';
import React, { useState } from 'react';

interface Props {
  merchant: IMerchant;
}

const EditableMerchantFields: React.FC<Props> = ({ merchant }) => {
  const screenDataDispatch = useScreenDataDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldSave = (updates: Partial<IMerchant>) => {
    setLoading(true);
    merchantsService
      .update(merchant.id, updates)
      .then((updatedMerchant) => {
        screenDataDispatch({
          type: 'SCREEN_UPDATE_MERCHANT',
          value: updatedMerchant,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex divide-x divide-zinc-500 border-t border-zinc-500">
      <div className="w-full space-y-1 p-4">
        <EditableField
          title="Name"
          initialValue={merchant.name}
          fieldType="text"
          onSave={(name) => handleFieldSave({ name })}
          loading={loading}
          width="w-36"
        />
        <EditableTextArea
          title="Descript."
          initialValue={merchant.description}
          onSave={(description) => handleFieldSave({ description })}
          width="flex-grow"
        />
        <EditableField
          title="Logo"
          initialValue={merchant.logo}
          fieldType="url"
          onSave={(logo) => handleFieldSave({ logo })}
          loading={loading}
          width="flex-grow"
        />
        <EditableField
          title="URL"
          initialValue={merchant.url}
          fieldType="url"
          onSave={(url) => handleFieldSave({ url })}
          loading={loading}
          width="flex-grow"
        />
      </div>
    </div>
  );
};

export default EditableMerchantFields;
