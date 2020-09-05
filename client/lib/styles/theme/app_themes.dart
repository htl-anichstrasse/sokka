import 'package:flutter/material.dart';

/// -----------------------------------------------------------
/// Defines and centralises the app theme and all other styles.
/// -----------------------------------------------------------
class AppThemes {
    /// Defines the globally used font.
    static final String _fontFamily = 'FiraCode';

    /// Foreground colour for dark theme.
    static final Color _darkThemeFontColour = Colors.black;

    /// Foreground colour for light theme.
    static final Color _lightThemeFontColour = Colors.white;

    /// ThemeData for dark mode.
    static ThemeData get darkModeAppTheme => ThemeData(
        primaryColor: Colors.tealAccent[700],
        scaffoldBackgroundColor: Colors.grey[850],
        canvasColor: Colors.grey[850],
        cardColor: Colors.tealAccent[100],
        visualDensity: VisualDensity.adaptivePlatformDensity,
        textTheme: _textTheme(_darkThemeFontColour),
        fontFamily: _fontFamily,
    );

    /// ThemeData for light mode.
    static ThemeData get lightModeAppTheme => ThemeData(
        primaryColor: Colors.tealAccent[700],
        scaffoldBackgroundColor: Colors.white,
        canvasColor: Colors.white,
        cardColor: Colors.tealAccent[100],
        visualDensity: VisualDensity.adaptivePlatformDensity,
        textTheme: _textTheme(_lightThemeFontColour),
        fontFamily: _fontFamily,
    );
    
    /// TextTheme for both themes.
    static TextTheme _textTheme(final Color fontColour) => new TextTheme(
        bodyText1: new TextStyle(
            fontSize: 14,
            color: fontColour,
        ),
        bodyText2: new TextStyle(
            fontSize: 12,
            color: fontColour,
        ),
        headline1: new TextStyle(
            fontSize: 30,
            color: fontColour
        ),
        headline2: new TextStyle(
            fontSize: 26,
            color: fontColour,
        ),
        headline3: new TextStyle(
            fontSize: 22,
            color: fontColour,
        ),
        headline4: new TextStyle(
            fontSize: 18,
            color: fontColour,
        ),
    );
}