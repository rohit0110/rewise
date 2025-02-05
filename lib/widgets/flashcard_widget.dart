import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/flashcard_provider.dart';

class FlashcardWidget extends StatefulWidget {
  final String question;
  final String answer;
  final String id;

  const FlashcardWidget({
    Key? key,
    required this.question,
    required this.answer,
    required this.id,
  }) : super(key: key);

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
      onTap: _flipCard, // Flip the card on tap
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
              transitionBuilder: (Widget child, Animation<double> animation) {
                return RotationYTransition(child: child, animation: animation); // Flip effect
              },
              child: _isFlipped
                  ? _buildCard(widget.answer, key: ValueKey(true))
                  : _buildCard(widget.question, key: ValueKey(false)),
            ),
          );
        },
      ),
    );
  }

  // Build the card UI
  Widget _buildCard(String text, {Key? key}) {
    return Container(
      key: key,
      width: 300,
      height: 200,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Colors.blueAccent,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
      ),
      child: Text(
        text,
        style: TextStyle(fontSize: 20, color: Colors.white),
        textAlign: TextAlign.center,
      ),
    );
  }
}

// Custom animation class for Y-axis rotation (flip effect)
class RotationYTransition extends StatelessWidget {
  final Widget child;
  final Animation<double> animation;

  const RotationYTransition({required this.child, required this.animation});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final angle = animation.value * 3.1416;
        return Transform(
          transform: Matrix4.rotationY(angle),
          alignment: Alignment.center,
          child: child,
        );
      },
      child: child,
    );
  }
}
