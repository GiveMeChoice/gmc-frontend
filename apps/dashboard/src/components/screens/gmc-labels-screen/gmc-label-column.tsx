/* eslint-disable @next/next/no-img-element */
import ConfirmableButton from '@root/components/shared/confirmable-button';
import EditableField from '@root/components/shared/editable-field';
import FramedButton from '@root/components/shared/framed-button';
import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import merchantLabelsService from '@root/services/merchant-labels.service';
import { toastService } from '@root/services/toast.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGmcLabelDialog from './create-gmc-label-dialog';
import EditableTextArea from '@root/components/shared/editable-text-area';
import { gmcLabelsService } from '@root/services/gmc-labels.service';
import { IGmcLabel } from 'gmc-types';
import ColorDropdown from '../shared/color-dropdown';
const RightArrowIcon = require('../../../assets/images/right-arrow.svg');
const DeleteIcon = require('../../../assets/images/delete-icon.svg');

interface Props {
  labels: IGmcLabel[];
  superParent?: IGmcLabel;
  parent?: IGmcLabel;
  // parentSlug?: string;
  selected?: IGmcLabel;
  onSelectLabel?: (label: IGmcLabel) => void;
}

const GmcLabelColumn: React.FC<Props> = ({
  labels: initialLabels,
  parent,
  selected,
  superParent,
  // parentSlug,
  onSelectLabel,
}) => {
  useEffect(() => {
    setLabels(initialLabels);
  }, []);

  const [labels, setLabels] = useState<IGmcLabel[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const navigate = useNavigate();

  const handleSelectSublabel = (label) => {
    if (!selected || selected.id !== label.id) {
      onSelectLabel(label);
    }
  };

  const handleAfterLabelCreated = (label) => {
    const updated = [label, ...labels];
    setLabels(updated);
  };

  const handleUpdateLabel = (id, updates) => {
    setLoading(true);
    gmcLabelsService
      .update(id, updates)
      .then((updated) => {
        setLabels(labels.map((cat) => (cat.id === id ? updated : cat)));
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Label Updated Successfully',
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
        setLoading(false);
      });
  };

  const handleDeleteLabel = async (id) => {
    gmcLabelsService
      .deleteOne(id)
      .then(() => {
        setLabels(labels.filter((cat) => cat.id !== id));
        toastService.setToast(
          {
            level: 'SUCCESS',
            message: 'Label Deleted Successfully',
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
      .finally(() => {});
  };

  const handleMerchantLabelsClick = (gmcLabelId: string) => {
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: { ...initialFilters, gmcLabelId },
    });
    dispatch({
      type: 'SCREEN_REFRESH_MERCHANT_LABELS',
      value: { data: [], meta: {} },
    });
    navigate(merchantLabelsService.labelsScreenControl.pathname);
  };

  return (
    <div className="flex w-full flex-col divide-y-1.5 divide-zinc-900">
      <CreateGmcLabelDialog
        superParent={superParent}
        parent={parent}
        onCreated={handleAfterLabelCreated}
      />
      {labels && labels.length > 0 ? (
        labels.map((lab) => (
          <div
            style={{
              backgroundColor:
                selected && selected.id === lab.id
                  ? parent
                    ? superParent
                      ? superParent.color
                      : parent.color
                    : lab.color
                  : '',
            }}
            className={cn('flex h-fit w-full divide-x-1.5 divide-zinc-400', {})}
          >
            <div className="flex w-full flex-col justify-evenly gap-y-1.5 px-5 py-3">
              <span className="text-lg font-bold">
                {lab.name.toUpperCase()}
              </span>
              <span className="pb-1 pl-1 text-xs italic text-zinc-700">
                /shop/label/{superParent ? superParent.slug + '/' : ''}
                {parent ? parent.slug + '/' : ''}
                {lab.slug.toLowerCase()}
              </span>
              <div className="flex flex-col gap-y-1.5 pl-4">
                <EditableField
                  title="NAME"
                  initialValue={lab.name}
                  fieldType={'text'}
                  disabled={!parent || !superParent}
                  width="w-full"
                  loading={loading}
                  onSave={(name) => handleUpdateLabel(lab.id, { name })}
                />
                <EditableField
                  title="SLUG"
                  initialValue={lab.slug}
                  fieldType={'text'}
                  disabled={!parent || !superParent}
                  width="w-full"
                  loading={loading}
                  onSave={(slug) => handleUpdateLabel(lab.id, { slug })}
                />
                <EditableTextArea
                  title="DXN"
                  initialValue={lab.description}
                  disabled={!parent || !superParent}
                  width="w-full"
                  onSave={(description) =>
                    handleUpdateLabel(lab.id, { description })
                  }
                />
                {!parent && (
                  <ColorDropdown
                    initialColor={lab.color}
                    loading={loading}
                    onSave={(color) =>
                      handleUpdateLabel(lab.id, {
                        color,
                      })
                    }
                  />
                )}
              </div>
              <div className="flex h-7 w-full justify-start pl-0.5">
                <ConfirmableButton
                  onConfirm={() => handleDeleteLabel(lab.id)}
                  title={
                    <>
                      <img
                        className="h-4 pr-2.5"
                        src={DeleteIcon}
                        alt="delete"
                      />
                      <span className="text-sm">Delete</span>
                    </>
                  }
                />
              </div>
            </div>
            {onSelectLabel ? (
              <div
                className={cn('flex w-[25%] items-center justify-center', {
                  'cursor-pointer hover:bg-primary active:bg-primary-light-10 ':
                    !selected || selected.id !== lab.id,
                })}
                onClick={() => handleSelectSublabel(lab)}
              >
                <img className="w-[40%]" src={RightArrowIcon} alt="arrow" />
              </div>
            ) : (
              <div className={cn('flex w-[25%] items-center justify-center')}>
                <FramedButton
                  onClick={() => handleMerchantLabelsClick(lab.id)}
                  title="Merchant Labels"
                  count={!lab.merchantLabels ? 0 : lab.merchantLabels.length}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="w-full py-12 text-center">No Labels Configured</div>
      )}
      <div className=""></div>
    </div>
  );
};

export default GmcLabelColumn;
