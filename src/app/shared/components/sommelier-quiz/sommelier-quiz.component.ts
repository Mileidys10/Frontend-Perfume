import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SommelierService, QuizQuestion, QuizOption, SommelierRecommendation } from '../../../services/sommelier.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-sommelier-quiz',
  templateUrl: './sommelier-quiz.component.html',
  styleUrls: ['./sommelier-quiz.component.scss'],
  standalone: false
})
export class SommelierQuizComponent implements OnInit {
  @Output() closeQuiz = new EventEmitter<void>();

  public questions: QuizQuestion[] = [];
  public currentStepIndex: number = 0;
  public selectedAnswers: Record<string, QuizOption> = {};
  public isCompleted: boolean = false;
  public isCalculating: boolean = false;
  public recommendation: SommelierRecommendation | null = null;
  public addedToCart: boolean = false;

  constructor(
    private sommelierService: SommelierService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.questions = this.sommelierService.getQuestions();
  }

  public get currentQuestion(): QuizQuestion {
    return this.questions[this.currentStepIndex];
  }

  public selectOption(option: QuizOption): void {
    this.selectedAnswers[this.currentQuestion.id] = option;

    if (this.currentStepIndex < this.questions.length - 1) {
      setTimeout(() => {
        this.currentStepIndex++;
      }, 250);
    } else {
      this.finishQuiz();
    }
  }

  public previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  public finishQuiz(): void {
    this.isCalculating = true;
    setTimeout(() => {
      this.recommendation = this.sommelierService.calculateRecommendation(this.selectedAnswers);
      this.isCalculating = false;
      this.isCompleted = true;
    }, 1200);
  }

  public restartQuiz(): void {
    this.selectedAnswers = {};
    this.currentStepIndex = 0;
    this.isCompleted = false;
    this.recommendation = null;
    this.addedToCart = false;
  }

  public addRecommendationToCart(): void {
    if (!this.recommendation) return;

    this.cartService.addToCart({
      id: 9991,
      name: this.recommendation.fragranceName,
      description: this.recommendation.description,
      price: this.recommendation.price,
      imageUrl: this.recommendation.imageUrl,
      brandName: this.recommendation.brand,
      sizeMl: 100,
      quantity: 1
    });

    this.addedToCart = true;
    setTimeout(() => {
      this.closeQuiz.emit();
    }, 1500);
  }

  public addSampleToCart(): void {
    if (!this.recommendation) return;

    this.cartService.addToCart({
      id: 9992,
      name: `Vial Muestra (2ml) - ${this.recommendation.fragranceName}`,
      description: 'Muestra oficial de cata sensorial para probar en piel.',
      price: this.recommendation.samplePrice,
      imageUrl: this.recommendation.imageUrl,
      brandName: this.recommendation.brand,
      sizeMl: 2,
      quantity: 1
    });

    this.addedToCart = true;
    setTimeout(() => {
      this.closeQuiz.emit();
    }, 1500);
  }

  public onClose(): void {
    this.closeQuiz.emit();
  }
}
