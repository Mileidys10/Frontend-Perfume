import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CardComponent } from './components/card/card.component';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ModerationBadgeComponent } from './components/moderation-badge/moderation-badge.component';
import { TruncatePipe } from '../pipes/TruncatePipe';

// ✦ V2 Haute Parfumerie Components ✦
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { OlfactoryPyramidComponent } from './components/olfactory-pyramid/olfactory-pyramid.component';
import { SommelierQuizComponent } from './components/sommelier-quiz/sommelier-quiz.component';
import { DiscoveryBoxComponent } from './components/discovery-box/discovery-box.component';
import { LaserEngravingComponent } from './components/laser-engraving/laser-engraving.component';
import { FragranceLayeringComponent } from './components/layering-studio/layering-studio.component';
import { LuxuryTimelineComponent } from './components/luxury-timeline/luxury-timeline.component';

@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    ImageUploadComponent,
    ModerationBadgeComponent,
    HeaderButtonsComponent,
    SearchbarComponent,
    TruncatePipe,
    // V2 Declarations
    ThemeToggleComponent,
    OlfactoryPyramidComponent,
    SommelierQuizComponent,
    DiscoveryBoxComponent,
    LaserEngravingComponent,
    FragranceLayeringComponent,
    LuxuryTimelineComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    ImageUploadComponent,
    ModerationBadgeComponent,
    HeaderButtonsComponent,
    SearchbarComponent,
    TruncatePipe,
    // V2 Exports
    ThemeToggleComponent,
    OlfactoryPyramidComponent,
    SommelierQuizComponent,
    DiscoveryBoxComponent,
    LaserEngravingComponent,
    FragranceLayeringComponent,
    LuxuryTimelineComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
