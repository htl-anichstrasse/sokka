import 'package:flutter/material.dart';
import 'package:client/views/home_screen.dart';
import 'package:client/views/login_screen.dart';

final Map routes = {
    '/':        (BuildContext buildContext) => new LoginScreen(),
    '/login':   (BuildContext buildContext) => new LoginScreen(),
    '/home':    (BuildContext buildContext) => new HomeScreen(),
};