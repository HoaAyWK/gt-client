import React, { useMemo } from 'react';
import { Stack } from '@mui/material';

import { AttributeValueButton } from './components';

const AttributeList = (props) => {
  const {
    attribute,
    selectedAttributeValue,
    selectedAttributes,
    onSelectAttributeValue
  } = props;

  const attributeValuesToDisplay = useMemo(() => {
    if (selectedAttributeValue) {
      if (selectedAttributeValue.attributeId !== attribute.id) {
        return attribute.attributeValues.map(value => {
          if (selectedAttributeValue.combinedAttributes[attribute.id]?.includes(value.id)) {
            return { ...value, selectable: true };
          }

          return { ...value, selectable: false };
        });
      }

      const combinedAttributeIds = Object.keys(selectedAttributeValue.combinedAttributes);

      return attribute.attributeValues.map(value => {
        if (value.id === selectedAttributeValue.id) {
          return { ...value, selectable: true };
        }

        if (combinedAttributeIds.every(id =>
          value.combinedAttributes[id]?.includes(selectedAttributes[id]))) {
          return { ...value, selectable: true };
        }

        return { ...value, selectable: false };
      })
    }

    return attribute.attributeValues.map(value => ({ ...value, selectable: true}));
  }, [attribute, selectedAttributeValue]);

  return (
    <Stack direction='row' spacing={2}>
      {attributeValuesToDisplay.map((value) => (
        <AttributeValueButton
          key={value.id}
          attribute={attribute}
          attributeValue={value}
          selectedAttributes={selectedAttributes}
          onSelectAttributeValue={onSelectAttributeValue}
        />
      ))}
    </Stack>
  );
};

export default AttributeList;
