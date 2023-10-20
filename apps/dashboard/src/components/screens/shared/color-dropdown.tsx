import FieldControlButtons from '@root/components/shared/field-control-buttons';
import React, { useState } from 'react';

interface Props {
  initialColor: string;
  loading: boolean;
  onSave: (value) => void;
}

const GMC_COLORS = {
  primary: {
    DEFAULT: '#a7f700',
    'dark-10': '#96de00',
    'dark-20': '#86c600',
    'dark-30': '#75ad00',
    'dark-40': '#649400',
    'dark-50': '#547c00',
    'light-10': '#b0f81a',
    'light-20': '#b9f933',
    'light-30': '#c1f94d',
    'light-40': '#cafa66',
    'light-50': '#d3fb80',
  },
  'gmc-dune': {
    DEFAULT: '#dcb586',
    'dark-10': '#c6a379',
    'dark-20': '#b0916b',
    'dark-30': '#9a7f5e',
    'dark-40': '#846d50',
    'dark-50': '#6e5b43',
    'light-10': '#e0bc92',
    'light-20': '#e3c49e',
    'light-30': '#e7cbaa',
    'light-40': '#ead3b6',
    'light-50': '#eedac3',
  },
  'gmc-jungle': {
    DEFAULT: '#adbe00',
    'dark-10': '#9cab00',
    'dark-20': '#8a9800',
    'dark-30': '#798500',
    'dark-40': '#687200',
    'dark-50': '#575f00',
    'light-10': '#b5c51a',
    'light-20': '#bdcb33',
    'light-30': '#c6d24d',
    'light-40': '#ced866',
    'light-50': '#d6df80',
  },
  'gmc-forest': {
    DEFAULT: '#029900',
    'dark-10': '#028a00',
    'dark-20': '#027a00',
    'dark-30': '#016b00',
    'dark-40': '#015c00',
    'dark-50': '#014d00',
    'light-10': '#1ba31a',
    'light-20': '#35ad33',
    'light-30': '#4eb84d',
    'light-40': '#67c266',
    'light-50': '#81cc80',
  },
  'gmc-heart': {
    DEFAULT: '#cc5170',
    'dark-10': '#b84965',
    'dark-20': '#a3415a',
    'dark-30': '#8f394e',
    'dark-40': '#7a3143',
    'dark-50': '#662938',
    'light-10': '#d1627e',
    'light-20': '#d6748d',
    'light-30': '#db859b',
    'light-40': '#e097a9',
    'light-50': '#e6a8b8',
  },
  'gmc-glacier': {
    DEFAULT: '#a7afc1',
    'dark-10': '#969eae',
    'dark-20': '#868c9a',
    'dark-30': '#757a87',
    'dark-40': '#646974',
    'dark-50': '#545861',
    'light-10': '#b0b7c7',
    'light-20': '#b9bfcd',
    'light-30': '#c1c7d4',
    'light-40': '#cacfda',
    'light-50': '#d3d7e0',
  },
  'gmc-beach': {
    DEFAULT: '#f8ff93',
    'dark-10': '#dfe684',
    'dark-20': '#c6cc76',
    'dark-30': '#aeb367',
    'dark-40': '#959958',
    'dark-50': '#7c804a',
    'light-10': '#f9ff9e',
    'light-20': '#f9ffa9',
    'light-30': '#faffb3',
    'light-40': '#fbffbe',
    'light-50': '#fcffc9',
  },
  'gmc-surf': {
    DEFAULT: '#56e2b3',
    'dark-10': '#4dcba1',
    'dark-20': '#45b58f',
    'dark-30': '#3c9e7d',
    'dark-40': '#34886b',
    'dark-50': '#2b715a',
    'light-10': '#67e5bb',
    'light-20': '#78e8c2',
    'light-30': '#89ebca',
    'light-40': '#9aeed1',
    'light-50': '#abf1d9',
  },
  'gmc-soil': {
    DEFAULT: '#8b763b',
    'dark-10': '#7d6a35',
    'dark-20': '#6f5e2f',
    'dark-30': '#615329',
    'dark-40': '#534723',
    'dark-50': '#463b1e',
    'light-10': '#97844f',
    'light-20': '#a29162',
    'light-30': '#ae9f76',
    'light-40': '#b9ad89',
    'light-50': '#c5bb9d',
  },
  'gmc-berry': {
    DEFAULT: '#aa7ab2',
    'dark-10': '#996ea0',
    'dark-20': '#88628e',
    'dark-30': '#77557d',
    'dark-40': '#66496b',
    'dark-50': '#553d59',
    'light-10': '#b387ba',
    'light-20': '#bb95c1',
    'light-30': '#c4a2c9',
    'light-40': '#ccafd1',
    'light-50': '#d5bdd9',
  },
  'gmc-sunset': {
    DEFAULT: '#f79cc4',
    'dark-10': '#de8cb0',
    'dark-20': '#c67d9d',
    'dark-30': '#ad6d89',
    'dark-40': '#945e76',
    'dark-50': '#7c4e62',
    'light-10': '#f8a6ca',
    'light-20': '#f9b0d0',
    'light-30': '#f9bad6',
    'light-40': '#fac4dc',
    'light-50': '#fbcee2',
  },
  'gmc-ocean': {
    DEFAULT: '#0e2071',
    'dark-10': '#0d1d66',
    'dark-20': '#0b1a5a',
    'dark-30': '#0a164f',
    'dark-40': '#081344',
    'dark-50': '#071039',
    'light-10': '#26367f',
    'light-20': '#3e4d8d',
    'light-30': '#56639c',
    'light-40': '#6e79aa',
    'light-50': '#8790b8',
  },
};

const ColorDropdown: React.FC<Props> = ({ initialColor, loading, onSave }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [color, setColor] = useState(initialColor);

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };

  const saveWrap = () => {
    onSave(color);
    setEditing(false);
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <span className="w-16 text-xs">COLOR</span>
      <select
        disabled={!editing}
        id="color"
        className="block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-2 text-xs text-white placeholder-secondary focus:border-primary focus:ring-primary"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option className="font-lg bg-secondary focus:ring-primary" value="">
          {'-----'}
        </option>
        {Object.keys(GMC_COLORS).map((gmc_col) => (
          <>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col].DEFAULT}
            >
              {gmc_col}
            </option>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col]['light-10']}
            >
              {gmc_col + '-light-10'}
            </option>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col]['light-20']}
            >
              {gmc_col + '-light-20'}
            </option>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col]['light-30']}
            >
              {gmc_col + '-light-30'}
            </option>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col]['light-40']}
            >
              {gmc_col + '-light-40'}
            </option>
            <option
              style={{ color: GMC_COLORS[gmc_col].DEFAULT }}
              className="font-lg bg-secondary"
              value={GMC_COLORS[gmc_col]['light-50']}
            >
              {gmc_col + '-light-50'}
            </option>
          </>
        ))}
      </select>
      <FieldControlButtons
        active={!loading && editing}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={saveWrap}
      />
    </div>
  );
};

export default ColorDropdown;
