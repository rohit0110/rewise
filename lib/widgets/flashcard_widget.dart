import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/flashcard_provider.dart';

class FlashcardWidget extends StatefulWidget {
  final String question;
  final String answer;
  final String id;

  const FlashcardWidget({
    super.key,
    required this.question,
    required this.answer,
    required this.id,
  });

  @override
  _FlashcardWidgetState createState() => _FlashcardWidgetState();
}

class _FlashcardWidgetState extends State<FlashcardWidget> {
  bool _isFlipped = false;

  void _flipCard() {
    setState(() {
      _isFlipped = !_isFlipped;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _flipCard, // Change color and show answer on tap
      child: Consumer(
        builder: (context, ref, child) {
          return Dismissible(
            key: ValueKey(widget.id), // Use the flashcard's unique ID
            direction: DismissDirection.endToStart, // Swipe left to delete
            onDismissed: (direction) {
              ref.read(flashcardsProvider.notifier).removeFlashcard(widget.id); // Use ref.read here
            },
            background: Container(
              color: Colors.red,
              child: Align(
                alignment: Alignment.centerRight,
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Icon(Icons.delete, color: Colors.white),
                ),
              ),
            ),
            child: AnimatedSwitcher(
              duration: Duration(milliseconds: 500),
              child: _buildCard(_isFlipped ? widget.answer : widget.question),
            ),
          );
        },
      ),
    );
  }

  // Build the card UI with dynamic background color
  Widget _buildCard(String text) {
    return Container(
      key: ValueKey(text), // Use the text itself as a key for switching between the question and answer
      width: 300,
      height: 200,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: _isFlipped ? Colors.green : Colors.blueAccent, // Change color when flipped
        borderRadius: BorderRadius.circular(16),
        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
      ),
      child: Text(
        text,
        style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        textAlign: TextAlign.center,
      ),
    );
  }
}
