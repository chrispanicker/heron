// ./components/CustomPriorityInput.tsx
import React, { useEffect, useState } from 'react';
import { useDocumentOperation } from 'sanity';


interface CustomPriorityInputProps {
  type: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomPriorityInput: React.FC<CustomPriorityInputProps> = ({
  type,
  id,
  value,
  onChange,
}) => {
  const [priorities, setPriorities] = useState<string[]>([]);
  const { patch } = useDocumentOperation(type, id);

  useEffect(() => {
    // Fetch all documents of this type to get their priorities
    // You need to adjust this query to fit your schema and needs
    fetch(`/api/${type}`)
      .then(response => response.json())
      .then(data => {
        const allPriorities: string[] = data.map((item: any) => item.priority);
        setPriorities(allPriorities);
      })
      .catch(error => console.error('Error fetching priorities:', error));
  }, [type, id]);

  const handleChange = (newValue: string) => {
    // Update the value in the input field
    onChange(newValue);

    // Update the priority value in the document
    patch.execute([{ set: { priority: newValue } }]);
  };

  return (
    <select value={value} onChange={e => handleChange(e.target.value)}>
      {priorities.map(priority => (
        <option key={priority} value={priority}>
          {priority}
        </option>
      ))}
    </select>
  );
};

export default CustomPriorityInput;