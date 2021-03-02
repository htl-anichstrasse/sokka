import 'package:flutter/material.dart';
import 'dart:ui' as UI;
import 'package:admin_client/util/Routes.dart';
import 'package:admin_client/util/CookieStorage.dart';
import 'package:admin_client/services/auth/ACPUserAuth.dart';
import 'package:admin_client/screens/auth/LoadingSplashScreen.dart';

void main() async => runApp(MyApp());

class MyApp extends StatelessWidget {
    final CookieStorage _cookieStorage = new CookieStorage();
    final ACPUserAuth _acpUserAuth = new ACPUserAuth();

    @override
    Widget build(BuildContext context) {
        return new FutureBuilder(
            future: this._initialize(),
            builder: (BuildContext context, AsyncSnapshot<bool> snapshot) { 
                print(this._cookieStorage.getUsernameSync());
                print(this._cookieStorage.getSessionTokenSync());
                if (snapshot.hasData) {
                    return new MaterialApp(
                        debugShowCheckedModeBanner: true,
                        routes: routes,
                        initialRoute: snapshot.data ? '/' : '/login',
                    );
                }
                return new MediaQuery(
                    data: new MediaQueryData.fromWindow(UI.window),
                    child: new Directionality(
                        textDirection: TextDirection.ltr,
                        child: new LoadingSplashScreen()
                    ),
                );
            },
        );
    }

    Future<bool> _initialize() async {
        final isValid = await this._acpUserAuth.acpSessionIsValid();
        print(isValid);
        if (isValid) {
            await this._cookieStorage.initializeCache();
        }
        return isValid;
    }
}