import 'package:flutter/material.dart';

class MealGridTile extends StatefulWidget {
    final int _mealTileIndex;

    MealGridTile(this._mealTileIndex);

    @override
    _MealGridTileState createState() => _MealGridTileState(this._mealTileIndex);
}

class _MealGridTileState extends State<MealGridTile> {
    final int _mealTileIndex;

    _MealGridTileState(this._mealTileIndex);

    @override
    Widget build(BuildContext context) {
        return new GridView.count(
            crossAxisCount: 2,
            children: <Widget>[
                new Center(
                    child: new Text(
                        'Josh stinkt',
                        style: new TextStyle(color: Colors.black),
                    ),
                ),
            ]
        );
    }
}