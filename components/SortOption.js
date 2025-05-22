// components/SortOptions.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SortOptions = ({ onSort, currentSort }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sortOptions = [
    { id: 'id', label: 'Número (ascendente)', icon: 'arrow-up' },
    { id: 'id-desc', label: 'Número (descendente)', icon: 'arrow-down' },
    { id: 'name', label: 'Nombre (A-Z)', icon: 'text' },
    { id: 'name-desc', label: 'Nombre (Z-A)', icon: 'text' },
  ];

  const handleSelect = (option) => {
    onSort(option.id);
    setModalVisible(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.id === currentSort);
    return option ? option.label : 'Ordenar por';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.sortButton} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="options-outline" size={20} color="#666" />
        <Text style={styles.sortButtonText}>{getCurrentSortLabel()}</Text>
        <Ionicons name="chevron-down" size={16} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  currentSort === option.id && styles.selectedOption
                ]}
                onPress={() => handleSelect(option)}
              >
                <Ionicons 
                  name={option.icon} 
                  size={18} 
                  color={currentSort === option.id ? "#f4511e" : "#666"} 
                />
                <Text 
                  style={[
                    styles.optionText,
                    currentSort === option.id && styles.selectedOptionText
                  ]}
                >
                  {option.label}
                </Text>
                {currentSort === option.id && (
                  <Ionicons name="checkmark" size={18} color="#f4511e" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortButtonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#fff5f2',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#f4511e',
    fontWeight: '500',
  },
});

export default SortOptions;