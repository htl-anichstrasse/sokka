import 'package:flutter/material.dart';

class LoadingSplashScreen extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return new Container(
            child: new Builder(
                builder: (BuildContext context) => new Stack(
                    children: <Widget>[
                        new Container(
                            decoration: new BoxDecoration(
                                image: new DecorationImage(
                                    image: new AssetImage('lib/styles/images/LoadingSplashBackground.png'),
                                    fit: BoxFit.cover
                                )
                            ),
                        ),
                        new Container(
                            alignment: Alignment.center,
                            child: new Image(
                                image: new AssetImage('lib/styles/images/Sokka.png'),
                                color: Colors.white,
                                height: 150.0,
                            )
                        ),
                        new Container(
                            alignment: Alignment.center,
                            child: new SizedBox(
                                width: 200.0,
                                height: 200.0,
                                child: new CircularProgressIndicator(
                                    strokeWidth: 10.0,
                                    valueColor: new AlwaysStoppedAnimation<Color>(
                                        new Color(0xFF00E5C6)
                                    ),
                                ),
                            ),
                        ),
                    ],
                ),
            ),
        );
    }
}