import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/views/tab_controller.dart';
import 'package:client/styles/theme/app_themes.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);
        return new MaterialApp(
            debugShowCheckedModeBanner: true,
            theme: AppThemes.darkModeAppTheme,
            home: new HomeTabController(),
        );
    }
}