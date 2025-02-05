import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/flashcard.dart';
import 'package:uuid/uuid.dart';

// Create a provider for managing the list of flashcards
final flashcardsProvider = StateNotifierProvider<FlashcardNotifier, List<Flashcard>>(
  (ref) => FlashcardNotifier(),
);

class FlashcardNotifier extends StateNotifier<List<Flashcard>> {
  FlashcardNotifier() : super([]) {
    _loadFlashcards();
  }

  // The box where the flashcards are stored
  late Box<Flashcard> _flashcardsBox;

  // Load flashcards from Hive
  Future<void> _loadFlashcards() async {
    _flashcardsBox = await Hive.openBox<Flashcard>('flashcards');
    state = _flashcardsBox.values.toList();
  }

  // Add a flashcard to Hive and the state
  Future<void> addFlashcard(String question, String answer) async {
    final newFlashcard = Flashcard(
      id: Uuid().v4(),
      question: question,
      answer: answer,
    );
    
    // Save the flashcard to Hive and await the key
    final key = await _flashcardsBox.add(newFlashcard);

    // Set the key after the flashcard is added
    newFlashcard.key = key;

    // Add the flashcard to the state
    state = [...state, newFlashcard];
  }

  // Remove a flashcard from Hive and the state
  void removeFlashcard(String id) {
    // Find the flashcard by its ID in the state
    final flashcardToRemove = state.firstWhere((flashcard) => flashcard.id == id);

    // Now, we can access the flashcard's key explicitly
    final flashcardKey = flashcardToRemove.key;

    // Delete the flashcard from the Hive box using its key
    _flashcardsBox.delete(flashcardKey);

    // Update the state by filtering out the deleted flashcard
    state = state.where((flashcard) => flashcard.id != id).toList();
  }
}
