import 'package:flutter/material.dart';

class Account extends StatefulWidget {
    @override
    _AccountState createState() => _AccountState();
}

class _AccountState extends State<Account> {
    @override 
    Widget build(BuildContext context) {
        return new Scaffold(
            appBar: new AppBar(
                title: new Center(
                    child: new Text('ACCOUNT'),
                ),
            ),
            body: new SafeArea(
                child: new Container(
                    child: new Icon(Icons.account_box, color: Colors.white),
                ),
            ),
        );
    }
}