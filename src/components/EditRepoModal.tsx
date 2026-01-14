import React, { useEffect, useState } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonFooter, IonButton, IonButtons } from '@ionic/react';
import { RepositoryItem } from '../Interfaces/RepositoryItem';

type Props = {
  isOpen: boolean;
  repo: RepositoryItem | null;
  onCancel: () => void;
  onSave: (data: { name: string; description: string | null }) => void;
};

const EditRepoModal: React.FC<Props> = ({ isOpen, repo, onCancel, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState<string | null>('');

  useEffect(() => {
    if (repo) {
      setName(repo.name || '');
      setDescription(repo.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [repo]);

  const handleSave = () => {
    onSave({ name: name.trim(), description: description?.trim() || null });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onCancel}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar repositorio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput value={name} onIonChange={e => setName((e.target as HTMLInputElement).value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput value={description || ''} onIonChange={e => setDescription((e.target as HTMLInputElement).value)} />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={onCancel}>Cancelar</IonButton>
            <IonButton color="primary" onClick={handleSave}>Guardar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default EditRepoModal;
