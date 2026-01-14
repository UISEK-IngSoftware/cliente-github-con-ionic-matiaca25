import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonAlert, IonToast } from '@ionic/react';
import { useState } from 'react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';
import EditRepoModal from '../components/EditRepoModal';
import { RepositoryItem } from '../Interfaces/RepositoryItem';
import { fetchRepositories, updateRepository, deleteRepository } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<RepositoryItem | null>(null);
  const [editingOriginalName, setEditingOriginalName] = useState<string>('');
  const [alertDeleteOpen, setAlertDeleteOpen] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<RepositoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    console.log ("IonViewDidEnter: Cargando repositorios...");  
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {repos.map((repo,index) => (
            <RepoItem 
              key={index}
              repo={repo}
              onEdit={() => {
                setEditingRepo(repo);
                setEditingOriginalName(repo.name);
                setIsEditOpen(true);
              }}
              onDelete={() => {
                setRepoToDelete(repo);
                setAlertDeleteOpen(true);
              }}
            />
          ))}
        </IonList>

        <EditRepoModal
          isOpen={isEditOpen}
          repo={editingRepo}
          onCancel={() => { setIsEditOpen(false); setEditingRepo(null); }}
          onSave={async (data) => {
            if (!editingRepo) return;
            const ok = await updateRepository(editingRepo.owner || '', editingOriginalName, { name: data.name, description: data.description });
            setIsEditOpen(false);
            if (ok) {
              setRepos(prev => prev.map(r => (r.name === editingOriginalName && r.owner === editingRepo.owner ? { ...r, name: data.name, description: data.description } : r)));
              setToastMessage('Repositorio actualizado correctamente');
            } else {
              setToastMessage('Error actualizando repositorio');
            }
            setEditingRepo(null);
          }}
        />

        <IonAlert
          isOpen={alertDeleteOpen}
          onDidDismiss={() => setAlertDeleteOpen(false)}
          header={'Confirmar'}
          message={`Eliminar repositorio ${repoToDelete?.name}?`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                setRepoToDelete(null);
              }
            },
            {
              text: 'Aceptar',
              handler: async () => {
                if (!repoToDelete) return;
                const ok = await deleteRepository(repoToDelete.owner || '', repoToDelete.name);
                if (ok) {
                  setRepos(prev => prev.filter(r => !(r.name === repoToDelete.name && r.owner === repoToDelete.owner)));
                  setToastMessage('Repositorio eliminado correctamente');
                } else {
                  setToastMessage('Error eliminando repositorio');
                }
                setRepoToDelete(null);
              }
            }
          ]}
        />

        <IonToast
          isOpen={toastMessage !== ''}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
