export const getLabelColor = (label: string) => {
  switch (label.toLowerCase()) {
    case 'certification':
      return 'gmc-dune';
    case 'origin':
      return 'gmc-beach';
    case 'organic':
      return 'gmc-forest';
    case 'fair trade':
      return 'gmc-soil';
    case 'production method':
      return 'gmc-ocean';
    case 'ingredients and dietary':
      return 'gmc-berry';
    case 'uncategorized':
      return 'gmc-glacier';
    default:
      return 'secondary';
  }
};
