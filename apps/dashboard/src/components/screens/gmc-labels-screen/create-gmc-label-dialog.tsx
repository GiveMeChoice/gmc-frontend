/* eslint-disable @next/next/no-img-element */
import LoadingWheel from '@root/components/shared/loading-wheel';
import { useMasterData } from '@root/context-providers/master-data.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import { IGmcLabel, gmcLabelsService } from '@root/services/gmc-labels.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useState } from 'react';
const AddCircleIcon = require('../../../assets/images/add-circle.svg');
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');

interface Props {
  superParent?: IGmcLabel;
  parent?: IGmcLabel;
  onCreated: (label: IGmcLabel) => void;
}

const CreateGmcLabelDialog: React.FC<Props> = ({
  superParent,
  parent,
  onCreated,
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useScreenDataDispatch();
  const { refreshGmcLabels } = useMasterData();

  const handleStartEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setName('');
    setSlug('');
    setDescription('');
  };

  const handleSave = () => {
    let tmpName = name.trim();
    let tmpSlug = slug.trim();
    if (!tmpName) {
      alert('NAME field is required');
    } else if (!tmpSlug) {
      alert('SLUG field is required');
    } else if (tmpSlug.indexOf(' ') >= 0) {
      alert('SLUG cannot have any spaces....  e.g. "this-is-a-valid-slug"');
    } else {
      setSaving(true);
      gmcLabelsService
        .create(parent.id, tmpName, tmpSlug, description)
        .then((created) => {
          onCreated(created);
          refreshGmcLabels();
          toastService.setToast(
            {
              level: 'SUCCESS',
              message: 'Label Created Successfully',
            },
            dispatch
          );
        })
        .catch((e) => {
          toastService.setToast(
            { level: 'ERROR', message: formatErrorMessage(e) },
            dispatch
          );
        })
        .finally(() => {
          setSaving(false);
          handleCancel();
        });
    }
  };

  return editing ? (
    <div
      className={cn('flex h-48 divide-x-1.5 divide-zinc-400', {
        'bg-secondary-dark-20': saving,
      })}
    >
      <div className="flex h-full w-4/5 flex-col justify-evenly px-4">
        <span className="text-lg font-bold">
          {!name ? '<New Label>' : name.toUpperCase()}
        </span>
        <span className="text-sm italic">
          /shop/label/{superParent ? superParent.slug + '/' : ''}
          {parent ? parent.slug + '/' : ''}
          {slug.toLowerCase()}
        </span>
        <div className="flex items-center gap-x-2">
          <span className="w-16">NAME</span>
          <input
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            type="text"
            title="name"
            value={name}
            disabled={saving}
            max={999}
            min={0}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-16">SLUG</span>
          <input
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            type="text"
            title="slug"
            disabled={saving}
            value={slug}
            max={999}
            min={0}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-16">DXN</span>
          <textarea
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            // type="text"
            title="description"
            disabled={saving}
            value={description}
            // max={999}
            // min={0}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="h-full w-1/5 divide-y-1.5 divide-zinc-500">
        <button
          className={cn(
            'flex h-1/2 w-full flex-col items-center justify-center space-y-4',
            {
              'hover:bg-primary active:bg-primary-light-10': !saving,
            }
          )}
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? (
            <LoadingWheel size="h-[20%]" />
          ) : (
            <img className="h-[20%]" src={SaveIcon} alt="save" />
          )}
          <span>SAVE</span>
        </button>
        <button
          className={cn(
            'flex h-1/2 w-full flex-col items-center justify-center space-y-4',
            {
              'hover:bg-gmc-sunset-light-30 active:bg-gmc-sunset-light-10':
                !saving,
            }
          )}
          disabled={saving}
          onClick={handleCancel}
        >
          <img className="h-[19%]" src={CancelIcon} alt="cancel" />
          <span>CANCEL</span>
        </button>
      </div>
    </div>
  ) : (
    <div
      className="flex h-20 w-full cursor-pointer items-center justify-center hover:bg-primary active:bg-primary-light-10"
      onClick={handleStartEdit}
    >
      <img className="h-3/5" src={AddCircleIcon} alt="add" />
    </div>
  );
};

export default CreateGmcLabelDialog;
