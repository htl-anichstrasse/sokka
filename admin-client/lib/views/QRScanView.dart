import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

class QRScanView extends StatefulWidget {
    @override
    _QRScanViewState createState() => new _QRScanViewState();
}

class _QRScanViewState extends State<QRScanView> {
    String _qrCode;

    @override 
    Widget build(BuildContext context) {
        return new Builder(
            builder: (context)
                => new Scaffold(
                    body: new Container(
                        child: new Center(
                            child: new Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                    new IconButton(
                                        icon: new Icon(Icons.qr_code_scanner_rounded, color: Colors.white),
                                        onPressed: () => this._scanQR(),
                                    )
                                ],
                            ),
                        ),
                    ),
                ),
        );
    }

    Future<void> _scanQR() async {
        try {
            final qrCode = await FlutterBarcodeScanner.scanBarcode(
                '#FF6666',
                'Cancel',
                true,
                ScanMode.QR,
            );

            if (!mounted) {
                return;
            }

            setState(() => this._qrCode = qrCode);
        } on PlatformException {
            this._qrCode = 'aksfja';
        }
    }
}