<ion-tabs>
  <ion-router-outlet></ion-router-outlet>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="tab1" href="/tabs/tab1">
      <ion-icon aria-hidden="true" :icon="triangle" />
      <ion-label>Tab 1</ion-label>
    <ion-tab-button tab="play" href="/tabs/play">
      <ion-icon aria-hidden="true" :icon="gameControllerOutline" />
      <ion-label>Play</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab2" href="/tabs/tab2">
      <ion-icon aria-hidden="true" :icon="ellipse" />
      <ion-label>Tab 2</ion-label>
    <ion-tab-button tab="about" href="/tabs/about">
      <ion-icon aria-hidden="true" :icon="helpOutline" />
      <ion-label>About</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab3" href="/tabs/tab3">
      <ion-icon aria-hidden="true" :icon="square" />
      <ion-label>Tab 3</ion-label>
    <ion-tab-button tab="scores" href="/tabs/scores">
      <ion-icon aria-hidden="true" :icon="trophyOutline" />
      <ion-label>Scores</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>


<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
import { gameControllerOutline, helpOutline, trophyOutline } from 'ionicons/icons';
</script>