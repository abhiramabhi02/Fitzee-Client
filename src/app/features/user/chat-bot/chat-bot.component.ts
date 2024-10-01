import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent {
  @Input() isVisible: boolean = false;
  messages: { text: string; isUser: boolean }[] = [];
  responseText: string = '';
  replies:any = {
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
  }
}
