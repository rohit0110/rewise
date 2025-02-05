import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/flashcard_provider.dart';
import '../widgets/flashcard_widget.dart';

class HomeScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the list of flashcards from the provider
    final flashcards = ref.watch(flashcardsProvider);

    return Scaffold(
      appBar: AppBar(title: Text('Flashcards')),
      body: flashcards.isEmpty
          ? Center(child: Text("No flashcards available"))
          : ListView.builder(
              itemCount: flashcards.length,
              itemBuilder: (context, index) {
                final flashcard = flashcards[index];
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FlashcardWidget(
                    question: flashcard.question,
                    answer: flashcard.answer,
                    id: flashcard.id,
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // When the FAB is pressed, we add a new flashcard
          ref.read(flashcardsProvider.notifier).addFlashcard(
                'What is Flutter?',
                'A UI toolkit for building natively compiled apps!',
              );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
