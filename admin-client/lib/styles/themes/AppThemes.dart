import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppThemes {
    TextStyle _defaultTextStyle({ final double fontSize, final Color fontColor })
        => GoogleFonts.montserrat(fontSize: fontSize, color: fontColor);

    static ThemeData get getDarkModeAppTheme => ThemeData(
        primaryColor: Colors.tealAccent[700],
        scaffoldBackgroundColor: Colors.grey[850],
        canvasColor: Colors.grey[850],
        cardColor: Colors.tealAccent[100],
        visualDensity: VisualDensity.adaptivePlatformDensity,
    );

    static ThemeData get getLightModeAppTheme => ThemeData(
        primaryColor: Colors.tealAccent[700],
        scaffoldBackgroundColor: Colors.white,
        canvasColor: Colors.white,
        cardColor: Colors.tealAccent[100],
        visualDensity: VisualDensity.adaptivePlatformDensity,
    );
}