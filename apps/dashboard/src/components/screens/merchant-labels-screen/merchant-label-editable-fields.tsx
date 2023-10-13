import EditableField from '@root/components/shared/editable-field';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import merchantLabelsService from '@root/services/merchant-labels.service';
import { IMerchantLabel } from 'gmc-types';
import React, { useState } from 'react';

interface Props {
  label: IMerchantLabel;
}

const MerchantLabelEditableFields: React.FC<Props> = ({ label }) => {
  const screenDataDispatch = useScreenDataDispatch();
  const [loading, setLoading] = useState(false);

  const handleFieldSave = (updates: Partial<IMerchantLabel>) => {
    setLoading(true);
    merchantLabelsService
      .update(label.id, updates)
      .then((updatedMerchant) => {
        screenDataDispatch({
          type: 'SCREEN_UPDATE_MERCHANT_LABEL',
          value: updatedMerchant,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <EditableField
        title="URL"
        initialValue={label.url}
        fieldType="text"
        width="w-full"
        onSave={(url) => handleFieldSave({ url })}
        loading={loading}
      />
      <EditableField
        title="Logo"
        initialValue={label.logo}
        fieldType="text"
        width="w-full"
        onSave={(logo) => handleFieldSave({ logo })}
        loading={loading}
      />
      <EditableField
        title="Name"
        initialValue={label.name}
        fieldType="text"
        width="w-full"
        onSave={(name) => handleFieldSave({ name })}
        loading={loading}
      />
      <EditableField
        title="Descript."
        initialValue={label.description}
        fieldType="text"
        width="w-full"
        onSave={(description) => handleFieldSave({ description })}
        loading={loading}
      />
    </>
  );
};

export default MerchantLabelEditableFields;
