import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements AfterViewInit {
  @Input() isVisible: boolean = false;
  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef; // Change to modalContent
  messages: { text: string; isUser: boolean }[] = [];
  replies: any = {
    Workout_Tips: {
      text: 'Here are some tips for your workout routine:',
      suggestions: [
        'Strength Training',
        'Cardio Exercises',
        'Flexibility Routines',
      ],
    },
    Nutrition_Advice: {
      text: 'Nutrition is key to your fitness. Consider these options:',
      suggestions: ['Balanced Diet', 'Meal Prepping', 'Hydration Tips'],
    },
    Fitness_Goals: {
      text: 'Setting goals is important. What would you like to achieve?',
      suggestions: ['Weight Loss', 'Muscle Gain', 'Endurance Training'],
    },
  };

  suggestionAction(suggestion: string) {
    const reply = this.replies[suggestion];

    this.messages.push({ text: suggestion.replace('_', ' '), isUser: true });

    if (reply) {
      this.messages.push({ text: reply.text, isUser: false });
    } else {
      this.messages.push({ text: 'I\'m not sure about that. Can you specify?', isUser: false });
    }

    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.modalContent) { // Use modalContent for scrolling
        this.modalContent.nativeElement.scrollTop = this.modalContent.nativeElement.scrollHeight;
      }
    }, 0);
  }

  ngAfterViewInit() {
    // Ensure the chat is scrolled to the bottom after the view initializes
    this.scrollToBottom();
  }
}
