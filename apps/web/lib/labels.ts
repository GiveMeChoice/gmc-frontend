import { LabelDocument, MerchantLabelDocument } from 'gmc-types';

export interface FlatLabel {
  index: number;
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
  description: string;
}

export const flattenLabels = (labels: LabelDocument[]): FlatLabel[] => {
  return labels.map((label, index) => ({
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
  }));
};

export const getLabelColor = (label: string) => {
  switch (label.toLowerCase()) {
    case 'certification':
      return 'gmc-forest';
    case 'origin':
      return 'gmc-beach';
    case 'organic':
      return 'gmc-jungle';
    case 'fair trade':
      return 'gmc-soil';
    case 'production method':
      return 'gmc-ocean-light-50';
    case 'ingredients and dietary':
      return 'gmc-berry-light-10';
    case 'uncategorized':
      return 'gmc-sunset';
    default:
      return 'secondary';
  }
};
