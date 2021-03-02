import 'dart:ui' as UI;
import 'package:client/services/ACPUserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/util/Routes.dart';
import 'package:client/screens/auth/LoadingSplashScreen.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/AppThemes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final ACPUserAuth _acpUserAuth = new ACPUserAuth();
    final CookieStorage _cookieStorage = new CookieStorage();

    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);

        return new FutureBuilder(
            future: this._initialize(),
            builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                if (snapshot.hasData) {
                    return new MaterialApp( 
                        debugShowCheckedModeBanner: true,
                        theme: AppThemes.getDarkModeAppTheme,
                        initialRoute: snapshot.data ? '/' : '/login',
                        routes: routes
                    );
                } else {
                    return new MediaQuery(
                        data: new MediaQueryData.fromWindow(UI.window),
                        child: new Directionality(
                            textDirection: TextDirection.ltr,
                            child: new LoadingSplashScreen(),
                        ),
                    );
                }
            },
        );
    }

    Future<bool> _initialize() async {
        final isValid = await this._acpUserAuth.validateACPSession();
        if (isValid) {
            await this._cookieStorage.initializeCache();
        }
        return isValid;
    }
}