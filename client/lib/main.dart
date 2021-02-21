import 'dart:ui' as UI;
import 'package:client/services/BearerAuth.dart';
import 'package:client/services/FetchOrderables.dart';
import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/util/Routes.dart';
import 'package:client/views/LoadingSplashScreen.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/AppThemes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final UserAuth _userAuth = new UserAuth();
    final FetchOrderables _fetchOrderables = new FetchOrderables();
    final CookieStorage _cookieStorage = new CookieStorage();

    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);
        this._cookieStorage.initializeCache();
        this._fetchOrderables.initializeMenus();
        
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
}