import 'package:client/views/tab_controller.dart';
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
                title: new Text('ACCOUNT'),
                centerTitle: true,
                automaticallyImplyLeading: false,
                leading: new IconButton(
                    icon: Icon(Icons.arrow_back, color: Colors.white),
                    onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => new HomeTabController())),
                ),
                actions: [],
            ),
            body: new SafeArea(
                child: new Container(
                    child: new Align(
                        alignment: Alignment.center,
                        child: new Icon(Icons.account_box, color: Colors.white),
                    ),
                ),
            ),
        );
    }
}