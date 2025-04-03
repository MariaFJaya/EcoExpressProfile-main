import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  // Estado del usuario
  const [user, setUser] = useState({
    name: 'Maria Jaya',
    email: 'mariajayaskyecoexpress@gmail.com',
    phone: '09963113961',
    membership: 'Oro',
    points: 1250,
    address: 'Av. Principal 123, Quito',
    joinDate: 'Miembro desde Septiembre 2023',
    image: 'data:image/jpeg;base64,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'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({...user});

  // Función para seleccionar imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setTempUser({...tempUser, image: result.assets[0].uri});
    }
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Perfil actualizado', 'Tus cambios se guardaron correctamente');
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con degradado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil EcoExpress</Text>
      </View>

      {/* Foto de perfil editable */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: isEditing ? tempUser.image : user.image }}
          style={styles.profileImage}
        />
        {isEditing && (
          <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tarjeta de información */}
      <View style={styles.infoCard}>
        <View style={styles.infoSection}>
          <MaterialIcons name="person" size={22} color="#4CAF50" style={styles.icon} />
          <Text style={styles.infoText}>{user.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <MaterialIcons name="email" size={22} color="#4CAF50" style={styles.icon} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <FontAwesome name="phone" size={22} color="#4CAF50" style={styles.icon} />
          {isEditing ? (
            <TextInput
              style={styles.editableField}
              value={tempUser.phone}
              onChangeText={(text) => setTempUser({...tempUser, phone: text})}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoText}>{user.phone}</Text>
          )}
        </View>

        <View style={styles.infoSection}>
          <Entypo name="location-pin" size={22} color="#4CAF50" style={styles.icon} />
          {isEditing ? (
            <TextInput
              style={styles.editableField}
              value={tempUser.address}
              onChangeText={(text) => setTempUser({...tempUser, address: text})}
            />
          ) : (
            <Text style={styles.infoText}>{user.address}</Text>
          )}
        </View>

        {/* Membresía y puntos */}
        <View style={styles.membershipContainer}>
          <View style={styles.membershipBadge}>
            <Ionicons name="ribbon" size={18} color="#FFD700" />
            <Text style={styles.membershipText}>Nivel {user.membership}</Text>
          </View>
          <Text style={styles.pointsText}>{user.points} Eco-Puntos</Text>
        </View>

        <Text style={styles.joinDateText}>{user.joinDate}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar perfil</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editableField: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 5,
    marginLeft: 5,
  },
  membershipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE475',
  },
  membershipText: {
    marginLeft: 8,
    color: '#8B7500',
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  joinDateText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#888',
    fontSize: 14,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  saveButton: {
    backgroundColor: '#FFC107',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;