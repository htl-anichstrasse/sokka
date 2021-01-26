import 'package:client/util/ProductController.dart';
import 'package:client/views/product/ProductTile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class ProductGrid extends StatefulWidget {
    @override
    _ProductGridState createState() => new _ProductGridState();
}

class _ProductGridState extends State<ProductGrid> {
    final ProductController _productController = new ProductController();
    final int _itemCount = 26;

    @override 
    Widget build(BuildContext context) {
        return new Scaffold(
            body: new StaggeredGridView.countBuilder(
                crossAxisCount: 4,
                itemCount: this._itemCount,
                itemBuilder: (BuildContext context, int index)
                    => new Container(
                        color: new Color(0xFFA7FFEB),
                        child: new Center(
                            child: new CircleAvatar(
                                backgroundColor: new Color(0xFFFF6A00),
                                child: new Text('${index + 1}')
                            )
                        ),
                    ),
                staggeredTileBuilder: (int index)
                    => new StaggeredTile.count(2, index.isEven ? 2 : 1),
                mainAxisSpacing: 4.0,
                crossAxisSpacing: 4.0,
            ),
        );
    }
}