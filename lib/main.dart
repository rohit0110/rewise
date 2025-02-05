import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:rewise/models/flashcard.dart';
import 'screens/home_screen.dart';

void main() async{
  await Hive.initFlutter();
  
  // Register the Flashcard adapter
  Hive.registerAdapter(FlashcardAdapter());

  // Open the Hive box
  await Hive.openBox<Flashcard>('flashcards');
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flashcards',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
    );
  }
}
