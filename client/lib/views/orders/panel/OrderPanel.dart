import 'dart:ui';
import 'package:client/models/Order.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:qr_flutter/qr_flutter.dart';

class OrderPanel extends StatefulWidget {
    final Order _order; 

    OrderPanel(this._order);

    @override 
    _OrderPanelState createState() => _OrderPanelState(this._order);
}

class _OrderPanelState extends State<OrderPanel> {
    final Order _order;

    _OrderPanelState(this._order);

    @override
    Widget build(BuildContext context) {
        return new Card(
            color: Colors.transparent,
            shape: new RoundedRectangleBorder(
                borderRadius: new BorderRadius.circular(20.0),
            ),
            clipBehavior: Clip.antiAlias,
            child: new ClipRRect(
                child: new BackdropFilter(
                    filter: new ImageFilter.blur(sigmaX: 16.0, sigmaY: 16.0),
                    child: new Container(
                        decoration: new BoxDecoration(
                            gradient: new LinearGradient(
                                colors: <Color>[
                                    Colors.white.withOpacity(0.7),
                                    Colors.white.withOpacity(0.05),
                                ],
                                stops: [0.0, 1.0],
                                begin: FractionalOffset.topLeft,
                                end: FractionalOffset.bottomRight,
                                tileMode: TileMode.repeated
                            ),
                        ),
                        child: new Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                                new Row(
                                    children: <Widget>[
                                        new SizedBox(
                                            width: MediaQuery.of(context).size.width * 0.50,
                                            child: new Column(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                children: <Widget>[
                                                    new ListTile(
                                                        title: new Text(
                                                            '${this._order.getTimestamp}',
                                                            style: GoogleFonts.montserrat(
                                                                color: Colors.black,
                                                                fontSize: 18.0,
                                                            ),
                                                        ),
                                                    ),
                                                    new Padding(
                                                        padding: new EdgeInsets.only(left: 30.0, bottom: 10.0),
                                                        child: new Column(
                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                            children: <Widget>[
                                                                for (MapEntry entry in this._order.getMenuOrders.entries) 
                                                                    this._createEntryContainer(entry),
                                                            ],
                                                        ),
                                                    ),
                                                    new Padding(
                                                        padding: new EdgeInsets.only(left: 30.0, top: 5.0),
                                                        child: new Column(
                                                            crossAxisAlignment: CrossAxisAlignment.start,
                                                            children: <Widget>[
                                                                for (MapEntry entry in this._order.getProductOrders.entries) 
                                                                    this._createEntryContainer(entry),
                                                            ],
                                                        ),
                                                    ),
                                                ],
                                            ),
                                        ),
                                        new SizedBox(
                                            width: MediaQuery.of(context).size.width * 0.45,
                                            child: new GestureDetector(
                                                onTap: () => showModalBottomSheet(
                                                    context: context,
                                                    builder: (context)
                                                        => new Container(
                                                            decoration: new BoxDecoration(
                                                                color: Colors.white,
                                                                borderRadius: new BorderRadius.only(
                                                                    topLeft: new Radius.circular(20.0),
                                                                    topRight: new Radius.circular(20.0),
                                                                ),
                                                            ),
                                                            child: Center(
                                                                child: new QrImage(
                                                                    data: this._order.getQRData,
                                                                    version: QrVersions.auto,
                                                                    size: 300.0,
                                                                ),
                                                            ),
                                                        ),
                                                ),
                                                child: new Padding(
                                                    padding: new EdgeInsets.only(right: 12, top: 12),
                                                    child: new ClipRRect(
                                                        borderRadius: new BorderRadius.circular(10.0),
                                                        child: new QrImage(
                                                            data: this._order.getQRData,
                                                            version: QrVersions.auto,
                                                            size: 200.0,
                                                        ),
                                                    ),
                                                ),
                                            ),
                                        ),
                                    ],
                                ),
                                new Divider(
                                    thickness: 1.0,
                                    color: Colors.black,
                                    indent: 20.0,
                                    endIndent: 20.0,
                                ),
                                new Row(
                                  children: <Widget>[
                                        new Padding(
                                            padding: new EdgeInsets.only(left: 30.0),
                                        ),
                                        new Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: <Widget>[
                                                new Container(
                                                    padding: new EdgeInsets.only(bottom: 5.0),
                                                    alignment: Alignment.center,
                                                    child: new Text(
                                                        'SUBTOTAL',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black
                                                        ),
                                                    ),
                                                ),
                                                new Container(
                                                    alignment: Alignment.center,
                                                    child: new Text(
                                                        'REBATE',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black
                                                        ),
                                                    )
                                                )
                                            ],
                                        ),
                                        new Padding(
                                            padding: new EdgeInsets.only(left: 50.0),
                                        ),
                                        new Column(
                                            crossAxisAlignment: CrossAxisAlignment.end,
                                            children: <Widget>[
                                                new Container(
                                                    padding: new EdgeInsets.only(bottom: 5.0),
                                                    alignment: Alignment.centerRight,
                                                    child: new Text(
                                                        '${this._order.getSubTotal.toStringAsFixed(2)} €',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black
                                                        ),
                                                    ),
                                                ),
                                                new Container(
                                                    alignment: Alignment.centerRight,
                                                    child: new Text(
                                                        '-${this._order.getRebate}%',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black
                                                        ),
                                                    )
                                                )
                                            ],
                                        ),
                                    ],
                                ),
                                new Divider(
                                    thickness: 1.0,
                                    color: Colors.black,
                                    indent: 20.0,
                                    endIndent: 20.0,
                                ),
                                new Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: <Widget>[
                                        new Padding(
                                            padding: new EdgeInsets.only(left: 30.0),
                                        ),
                                        new Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: <Widget>[
                                                new Container(
                                                    padding: new EdgeInsets.only(bottom: 10.0),
                                                    alignment: Alignment.center,
                                                    child: new Text(
                                                        'TOTAL',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
                                                            fontWeight: FontWeight.bold,
                                                        ),
                                                    ),
                                                ),
                                            ],
                                        ),
                                        new Padding(
                                            padding: new EdgeInsets.only(left: 80.0),
                                        ),
                                        new Column(
                                            crossAxisAlignment: CrossAxisAlignment.end,
                                            children: <Widget>[
                                                new Container(
                                                    padding: new EdgeInsets.only(bottom: 10.0),
                                                    alignment: Alignment.centerRight,
                                                    child: new Text(
                                                        '${this._order.getTotal.toStringAsFixed(2)} €',
                                                        style: GoogleFonts.montserrat(
                                                            color: Colors.black,
                                                            fontWeight: FontWeight.bold,
                                                        ),
                                                    ),
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                            ],
                        ),
                    ),
                ),
            ),
        );
    }

    Widget _createEntryContainer(final MapEntry entry) {
        return new Container(
            padding: EdgeInsets.only(bottom: 5.0),
            child: new Text(
                '${entry.value}x - ${entry.key}',
                style: GoogleFonts.montserrat(
                    color: Colors.black,
                    fontSize: 14,
                ),
            ),
        );
    }
}