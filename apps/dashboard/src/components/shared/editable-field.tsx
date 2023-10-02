import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';

interface Props {
  title: string;
  initialValue: string | number;
  fieldType: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  loading: boolean;
  width?: string;
  onSave: (updates) => void;
}

const EditableField: React.FC<Props> = ({
  title,
  initialValue,
  fieldType,
  loading,
  disabled,
  width,
  onSave,
}) => {
  const [value, setValue] = useState<any>(initialValue);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };

  const saveWrap = () => {
    onSave(fieldType === 'number' ? Number(value) : value);
    setEditing(false);
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <span className="w-16 text-xs">{title}</span>
      <input
        className={cn(`h-fit ${width} rounded-sm border p-1 pl-2 text-xs`, {
          'border-zinc-800 bg-white text-zinc-800': editing,
          'border-zinc-500 bg-secondary-dark-10 bg-opacity-50 text-zinc-500':
            !editing,
        })}
        type={fieldType}
        title={title}
        disabled={loading || !editing || disabled}
        value={value}
        max={999}
        min={0}
        onChange={(e) => setValue(e.target.value)}
      />
      {!disabled && (
        <FieldControlButtons
          active={!loading && editing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={saveWrap}
        />
      )}
    </div>
  );
};

export default EditableField;
