import 'package:flutter/material.dart';

class ProductTile extends StatefulWidget {
    final int _productTileIndex;

    ProductTile(this._productTileIndex);

    @override
    _ProductTileState createState() => _ProductTileState(this._productTileIndex);
}

class _ProductTileState extends State<ProductTile> {
    final int _productTileIndex;

    _ProductTileState(this._productTileIndex);

    @override
    Widget build(BuildContext context) {
        return null;
    }
}