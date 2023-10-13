import LoadingWheel from '@root/components/shared/loading-wheel';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import React, { useState } from 'react';
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');
import cn from 'classnames';
import channelsService from '@root/services/channels.service';
import MerchantKeySelect from './create-channel-dialog/merchant-key-select';
import ProviderKeySelect from './create-channel-dialog/provider-key-select';
import MerchantChip from '../merchants-screen/merchant-chip';
import { useMasterData } from '@root/context-providers/master-data.provider';
import { toastService } from '@root/services/toast.service';
import { formatErrorMessage } from '@root/helpers/format-error-message';

interface Props {
  onClose: () => void;
}

const CreateChannelDialog: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [merchantKey, setMerchantKey] = useState('');
  const [providerKey, setProviderKey] = useState('');
  const [etlCode1, setEtlCode1] = useState('');
  const [etlCode2, setEtlCode2] = useState('');
  const [etlCode3, setEtlCode3] = useState('');
  const [etlCode4, setEtlCode4] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useScreenDataDispatch();
  const { merchants } = useMasterData();

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    channelsService
      .create(merchantKey, providerKey, {
        name: name,
        ...(etlCode1 && { etlCode1 }),
        ...(etlCode2 && { etlCode2 }),
        ...(etlCode3 && { etlCode3 }),
        ...(etlCode4 && { etlCode4 }),
      })
      .then((created) => {
        dispatch({
          type: 'SCREEN_ADD_CHANNEL',
          value: created,
        });
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Channel Created Successfully',
          },
          dispatch
        );
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
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div
      className={cn('flex h-[360px] divide-x-1.5 divide-zinc-400', {
        'bg-secondary-dark-20': saving,
      })}
    >
      <div className="flex h-full w-4/5 flex-col py-4 px-12">
        <div className="flex items-center border-b-1.5 border-zinc-300 pr-10 pb-4">
          {merchantKey && (
            <div className="pr-8">
              <MerchantChip
                merchant={merchants.find((m) => m.key === merchantKey)}
              />
            </div>
          )}
          {providerKey && (
            <span className="pr-2 text-sm font-bold">{providerKey} &gt; </span>
          )}
          <span className="font-bold text-gmc-soil-light-10">
            {!name ? '<New Channel>' : name}
          </span>
        </div>
        <div className="flex w-full gap-x-12 p-4 pb-6">
          <MerchantKeySelect
            currentValue={merchantKey}
            onValueChange={(e) => {
              setMerchantKey(e.target.value);
            }}
          />
          <ProviderKeySelect
            currentValue={providerKey}
            onValueChange={(e) => {
              setProviderKey(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-x-2 px-12">
          <span className="w-20 text-center">NAME</span>
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
        <div className="flex gap-x-8 px-8 pt-6">
          <div className="flex w-1/2 flex-col gap-y-1.5">
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm">ETL Code 1</span>
              <input
                className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
                type="text"
                title="etlCode1"
                disabled={saving}
                value={etlCode1}
                max={999}
                min={0}
                onChange={(e) => setEtlCode1(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm">ETL Code 2</span>
              <input
                className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
                type="text"
                title="etlCode2"
                disabled={saving}
                value={etlCode2}
                max={999}
                min={0}
                onChange={(e) => setEtlCode2(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-y-1.5">
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm">ETL Code 3</span>
              <input
                className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
                type="text"
                title="etlCode3"
                disabled={saving}
                value={etlCode3}
                max={999}
                min={0}
                onChange={(e) => setEtlCode3(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm">ETL Code 4</span>
              <input
                className="h-fit w-full rounded-sm border border-zinc-800 bg-white p-1 pl-2 text-zinc-800"
                type="text"
                title="etlCode4"
                disabled={saving}
                value={etlCode4}
                max={999}
                min={0}
                onChange={(e) => setEtlCode4(e.target.value)}
              />
            </div>
          </div>
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
  );
};

export default CreateChannelDialog;
