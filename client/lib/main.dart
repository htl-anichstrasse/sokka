import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/components/tab_controller/tab_controller.dart';
import 'package:client/styles/theme/app_themes.dart';

void main() async => runApp(Sokka());

class Sokka extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        SystemChrome.setEnabledSystemUIOverlays([]);
        return new MaterialApp(
            debugShowCheckedModeBanner: true,
            theme: AppThemes.getDarkModeAppTheme,
            home: new HomeTabController(),
        );
    }
}