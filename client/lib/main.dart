import 'package:client/services/UserAuth.dart';
import 'package:client/util/routes.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/AppThemes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final UserAuth _userAuth = new UserAuth();

    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);
        return new FutureBuilder(
            future: this._userAuth.validateSession(),
            builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                if (snapshot.hasData) {
                    return new MaterialApp(
                        debugShowCheckedModeBanner: true,
                        theme: AppThemes.getDarkModeAppTheme,
                        initialRoute: snapshot.data ? '/' : '/login',
                        routes: routes
                    );
                } else {
                    return new CircularProgressIndicator();
                }
            },
        );
    }
}

