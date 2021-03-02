import 'package:flutter/material.dart';
import 'package:admin_client/util/CookieStorage.dart';

class HomeScreen extends StatefulWidget {
    @override
    _HomeScreenState createState() => new _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
    final CookieStorage _cookieStorage = new CookieStorage();

    @override
    void initState() {
        super.initState();
        print(this._cookieStorage.getUsernameSync());
        print(this._cookieStorage.getSessionTokenSync());
    }

    @override
    Widget build(BuildContext context) {
        return new Builder(
            builder: (context)
                => new Scaffold(
                    body: new Center(
                        child: new FloatingActionButton(
                            child: new Text('alsjfdlökasjf'),
                            onPressed: () => {
                                print(this._cookieStorage.getUsernameSync()),
                                print(this._cookieStorage.getSessionTokenSync())
                            },
                        ),
                    ),
                ),
        );
    }
}

