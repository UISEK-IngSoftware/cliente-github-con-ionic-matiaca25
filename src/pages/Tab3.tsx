import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';


const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle> 
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" src="https://media.licdn.com/dms/image/v2/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzovpZ5y0BWz4YD-t_akXL0zaCWmaj612HlQ&s/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1680898495129?e=2147483647&v=beta&t=upgYeWJF7fytiPdn0Pq8b8ml4eSKCXq_FfjRYVc7m-Q" />
      <IonCardHeader>
        <IonCardTitle>Matias Romero</IonCardTitle>
        <IonCardSubtitle>Matiaca25</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Me llamo Matias Romero tengo 21 años y soy estudiante de ingeniería en informática.</IonCardContent>
    </IonCard>
  ;
      </IonContent>
    </IonPage>
  );
};

export default Tab3;