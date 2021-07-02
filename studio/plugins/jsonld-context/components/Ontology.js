import React from 'react';
import { Card, Code } from '@sanity/ui';

const Ontology = ({ ontology }) => {
  return (
    <Card marginTop={6} tone="positive" padding={3}>
      <Code style={{maxHeight: '70vh', overflow: 'scroll'}}  language="json" size={0}>
        {JSON.stringify(ontology, null, 2)}
      </Code>
    </Card>
  );
};

export default Ontology;
