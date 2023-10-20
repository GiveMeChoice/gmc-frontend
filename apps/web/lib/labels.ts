import { IGmcLabel, LabelDocument, MerchantLabelDocument } from 'gmc-types';
import { IGmcBaseCategory } from './categories';

export interface FlatLabel {
  index: number;
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
  description: string;
  baseLabelSlug: string;
  color?: string;
}

export const flattenLabelDocuments = (labels: LabelDocument[]): FlatLabel[] => {
  return labels
    .filter((l) => !!l.gmcLabel)
    .map((label, index) => ({
      index,
      merchantLabel: label.merchantLabel,
      type: label.gmcLabel.name,
      name: !label.gmcLabel.sublabel
        ? label.gmcLabel.name
        : !label.gmcLabel.sublabel.sublabel
        ? label.gmcLabel.sublabel.name
        : label.gmcLabel.sublabel.sublabel.name,
      description: !label.gmcLabel.sublabel
        ? label.gmcLabel.description
        : !label.gmcLabel.sublabel.sublabel
        ? label.gmcLabel.sublabel.description
        : label.gmcLabel.sublabel.sublabel.description,
      baseLabelSlug: label.gmcLabel.slug,
    }));
};

export const getBaseLabelFromDocument = (labelDocument: LabelDocument) => [];

export const getBaseLabel = (label: IGmcLabel) => {
  return label.parent && label.parent.slug !== 'root'
    ? label.parent.parent && label.parent.parent.slug !== 'root'
      ? label.parent.parent
      : label.parent
    : label;
};

export const getLabelColor = (label: string) => {
  return 'blue';
};

export const baseLabels: IGmcBaseCategory[] = [
  {
    name: 'Certification',
    slug: 'certification',
    color: '#adbe00',
    children: [],
  },
  {
    name: 'Fair Trade',
    slug: 'fair-trade',
    color: '#b387ba',
    children: [],
  },
  {
    name: 'Ingredients and Dietary',
    slug: 'ingredients-and-dietary',
    color: '#56e2b3',
    // color: '#8790b8',
    children: [],
  },
  {
    name: 'Organic',
    slug: 'organic',
    color: '#dcb586',
    // color: '#97844f',
    children: [],
  },
];
