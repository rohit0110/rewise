import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/flashcard.dart';
import 'package:uuid/uuid.dart';

// Define a provider to manage the list of flashcards
final flashcardsProvider = StateNotifierProvider<FlashcardNotifier, List<Flashcard>>(
  (ref) => FlashcardNotifier(),
);

class FlashcardNotifier extends StateNotifier<List<Flashcard>> {
  FlashcardNotifier() : super([]);

  // Add a new flashcard
  void addFlashcard(String question, String answer) {
    final newFlashcard = Flashcard(
      id: Uuid().v4(), // Generate a unique ID for each flashcard
      question: question,
      answer: answer,
    );
    state = [...state, newFlashcard]; // Add the new flashcard to the list
  }

  // Remove a flashcard by ID
  void removeFlashcard(String id) {
    state = state.where((flashcard) => flashcard.id != id).toList(); // Remove by ID
  }
}
