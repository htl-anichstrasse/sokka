import 'package:flutter/material.dart';

class Account extends StatefulWidget {
  @override
  _AccountState createState() => _AccountState();
}

class _AccountState extends State<Account> {
  @override 
  Widget build(BuildContext context) {
    return Scaffold(
      body: Icon(Icons.account_box)
    );
  }
}