/* eslint-disable @next/next/no-img-element */
import LoadingWheel from '@root/components/shared/loading-wheel';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import { IGmcBrand, gmcBrandsService } from '@root/services/gmc-brands.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useState } from 'react';
const AddCircleIcon = require('../../../assets/images/add-circle.svg');
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');

interface Props {
  onCreated: (brand: IGmcBrand) => void;
}

const CreateGmcBrandDialog: React.FC<Props> = ({ onCreated }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useScreenDataDispatch();

  const handleStartEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setName('');
    setSlug('');
    setDescription('');
    setLogo('');
    setUrl('');
  };

  const handleSave = (brand: IGmcBrand) => {
    gmcBrandsService
      .create(brand)
      .then((created) => {
        dispatch({
          type: 'SCREEN_ADD_GMC_BRAND',
          value: created,
        });
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Bradn Created Successfully',
          },
          dispatch
        );
        setSaving(false);
        handleCancel();
      })
      .catch((e) => {
        toastService.setToast(
          {
            level: 'ERROR',
            message: formatErrorMessage(e),
          },
          dispatch
        );
        setSaving(false);
      });
  };

  return editing ? (
    <div
      className={cn('flex h-72 divide-x-1.5 divide-zinc-400', {
        'bg-secondary-dark-20': saving,
      })}
    >
      <div className="flex h-full w-4/5 flex-col justify-evenly px-12">
        <div className="flex items-center justify-between pr-10">
          <span className="text-lg font-bold">
            {!name ? '<New Brand>' : name.toUpperCase()}
          </span>
          <span className="italic">
            www.givemechoice.com/shop/brands/{slug.toLowerCase()}
          </span>
        </div>
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
          <span className="w-16">LOGO</span>
          <input
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            type="text"
            title="logo"
            disabled={saving}
            value={logo}
            max={999}
            min={0}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-16">URL</span>
          <input
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            type="text"
            title="logo"
            disabled={saving}
            value={url}
            max={999}
            min={0}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-16">DXN</span>
          <textarea
            className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
            title="description"
            disabled={saving}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-1/5 flex-col divide-y-1.5 divide-zinc-400">
        <button
          className={cn(
            'flex h-1/2 w-full flex-col items-center justify-center space-y-4',
            {
              'hover:bg-primary active:bg-primary-light-10': !saving,
            }
          )}
          disabled={saving}
          onClick={() =>
            handleSave({
              id: null,
              name,
              slug,
              logo,
              url,
              description,
            })
          }
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

export default CreateGmcBrandDialog;
