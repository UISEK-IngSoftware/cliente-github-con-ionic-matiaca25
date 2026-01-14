import { IonItem, IonLabel, IonThumbnail, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../Interfaces/RepositoryItem';
import { trashOutline, createOutline } from 'ionicons/icons';


const RepoItem: React.FC<{repo: RepositoryItem; onEdit?: () => void; onDelete?: () => void}> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repo.imageUrl || "https://trbl-services.eu/wp-content/uploads/2018/06/ionic-1.png"} alt={repo.name} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={onEdit}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;  