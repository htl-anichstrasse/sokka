import 'package:client/screens/auth/LoadingSplashScreen.dart';
import 'package:client/views/QRScanView.dart';
import 'package:flutter/material.dart';
import 'package:client/screens/HomeScreen.dart';
import 'package:client/screens/auth/LoginScreen.dart';

final Map<String, WidgetBuilder> routes = {
    '/':        (BuildContext buildContext) => new HomeScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/scan':    (BuildContext buildContext) => new QRScanView(),
    '/loading': (BuildContext buildContext) => new LoadingSplashScreen(),
};