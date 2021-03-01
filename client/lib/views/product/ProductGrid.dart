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

    @override 
    Widget build(BuildContext context) {
        return new Scaffold(
            body: new Container(
                decoration: new BoxDecoration(
                    image: new DecorationImage(
                        image: new AssetImage('lib/styles/images/ProductBackground.png'),
                        fit: BoxFit.cover,
                    ),
                ),
                child: new StaggeredGridView.countBuilder(
                    crossAxisCount: 4,
                    itemCount: this._productController.getProducts().length,
                    itemBuilder: (BuildContext context, int index)
                        => new ProductTile(this._productController.getProducts()[index]),
                    staggeredTileBuilder: (int index)
                        => new StaggeredTile.count(2, index.isEven ? 3.3 : 3.3),
                    mainAxisSpacing: 4.0,
                    crossAxisSpacing: 4.0,
                ),
            ),
        );
    }
}