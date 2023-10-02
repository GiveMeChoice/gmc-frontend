import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldControlButtons from './field-control-buttons';

interface Props {
  title: string;
  initialValue: string;
  width?: string;
  disabled?: boolean;
  onSave: (updates) => void;
}

const EditableTextArea: React.FC<Props> = ({
  title,
  initialValue,
  width,
  disabled,
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
    onSave(value);
    setEditing(false);
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <span className="w-16 text-xs">{title}</span>
      <textarea
        className={cn(
          `h-fit ${width} resize-none rounded-sm border p-1 pl-2.5 text-xs`,
          {
            'border-zinc-800 bg-white text-zinc-800': editing,
            'border-zinc-500 bg-secondary-dark-10 bg-opacity-50 text-zinc-500':
              !editing,
          }
        )}
        title={title}
        disabled={!editing || disabled}
        value={value}
        rows={2}
        onChange={(e) => setValue(e.target.value)}
      />
      {!disabled && (
        <FieldControlButtons
          active={editing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={saveWrap}
        />
      )}
    </div>
  );
};

export default EditableTextArea;
