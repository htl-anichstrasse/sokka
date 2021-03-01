import 'dart:ui' as UI;
import 'package:client/services/FetchOrderables.dart';
import 'package:client/services/OrderService.dart';
import 'package:client/services/UserAuth.dart';
import 'package:client/util/CookieStorage.dart';
import 'package:client/util/Routes.dart';
import 'package:client/views/auth/LoadingSplashScreen.dart';
import 'package:flutter/material.dart';
import 'package:client/styles/theme/AppThemes.dart';
import 'package:flutter/services.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    final UserAuth _userAuth = new UserAuth();
    final FetchOrderables _fetchOrderables = new FetchOrderables();
    final CookieStorage _cookieStorage = new CookieStorage();
    final OrderService _orderService = new OrderService();

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
        final isValid = await this._userAuth.validateSession();
        if (isValid) {
            await this._cookieStorage.initializeCache();
            await this._fetchOrderables.initializeMenus();
            await this._fetchOrderables.initializeProducts();
            await this._orderService.initializeOrders();
        }
        return isValid;
    }
}