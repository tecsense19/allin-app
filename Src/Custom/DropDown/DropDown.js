import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default Dropdown = ({ options }) => {
  const a = options
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={{ fontSize: 18 }}>
          {selectedOption || 'Select an option'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            zIndex: 1,
          }}
        >
          {a.map((option) => (
            <TouchableOpacity

              onPress={() => handleOptionSelect(option)}
              style={{ padding: 10 }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Example usage:

