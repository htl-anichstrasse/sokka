import 'package:client/services/UserAPIService.dart';
import 'package:client/util/SessionTokenStorage.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SignUpScreen extends StatefulWidget {
    @override
    _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
    final UserAPIService _userAPIService = new UserAPIService();
    final SessionTokenStorage _sessionTokenStorage = new SessionTokenStorage();

    final TextEditingController _emailController = new TextEditingController();
    final TextEditingController _passwordController = new TextEditingController();

    String _email;
    String _password;
    String _sessionToken;

        @override 
    Widget build(BuildContext context) {
        return new Scaffold(
            resizeToAvoidBottomPadding: false,
            body: new Builder(
                builder: (context) => new SingleChildScrollView(
                    child: new Center(
                        child: new Container(
                            padding: EdgeInsets.all(10.0),
                            child: Column(
                                children: <Widget>[
                                    new  Container(
                                        margin: new EdgeInsets.only(top: 30.0),
                                        child: new Text(
                                            'WELCOME TO',
                                            style: GoogleFonts.firaCode(
                                                fontSize: 15.0,
                                            ),
                                        ),
                                    ),
                                    new Container(
                                        margin: new EdgeInsets.only(top: 5.0),
                                        decoration: new BoxDecoration(
                                        
                                        ),
                                        child: new Text(
                                            'SOKKA',
                                            style: GoogleFonts.firaCode(
                                                fontWeight: FontWeight.bold,
                                                letterSpacing: 5.0,
                                                fontSize: 55.0,
                                            ),
                                        ),
                                    ),
                                    new Container(
                                        child: new Image(
                                            image: AssetImage('lib/styles/images/sokka.png'),
                                            color: Colors.white, width: 280.0
                                        ),
                                    ),
                                    new Stack(
                                        alignment: Alignment.center,
                                        children: <Widget>[
                                            new Container(
                                                height: 60.0,
                                                width: 60.0,
                                                decoration: new BoxDecoration(
                                                    borderRadius: new BorderRadius.circular(50.0),
                                                    color: Colors.tealAccent[100],
                                                ),
                                                child: new Icon(Icons.fastfood),
                                            ),
                                            new Container(
                                                margin: new EdgeInsets.only(top: 60.0, right: 75.0),
                                                height: 60.0,
                                                width: 60.0,
                                                decoration: new BoxDecoration(
                                                    borderRadius: new BorderRadius.circular(50.0),
                                                    color: Colors.tealAccent[700],
                                                ),
                                                child: new Icon(Icons.restaurant_menu, color: Colors.white)
                                            ),
                                            new Container(
                                                margin: new EdgeInsets.only(top: 90.0, left: 25.0),
                                                height: 60.0,
                                                width: 60.0,
                                                decoration: new BoxDecoration(
                                                    borderRadius: new BorderRadius.circular(50.0),
                                                    color: Colors.teal,
                                                ),
                                                child: new Icon(Icons.restaurant, color: Colors.white),
                                            ),
                                            new Container(
                                                margin: new EdgeInsets.only(top: 15.0, left: 95.0),
                                                height: 60.0,
                                                width: 60.0,
                                                decoration: new BoxDecoration(
                                                    borderRadius: new BorderRadius.circular(50.0),
                                                    color: Colors.tealAccent,
                                                ),
                                                child: Icon(Icons.shopping_basket),
                                            ),
                                        ],
                                    ),

                                        new Container(
                                            margin: EdgeInsets.only(top: 25.0),
                                            width: 200,
                                            child: new TextFormField(
                                                controller: _emailController,
                                                keyboardType: TextInputType.emailAddress,
                                                keyboardAppearance: Brightness.dark,
                                                decoration: new InputDecoration(
                                                    labelText: 'EMAIL ADDRESS',
                                                    labelStyle: new TextStyle(fontSize: 13.0),
                                                ),
                                            ),
                                        ),
                                    new Container(
                                        width: 200,
                                        child: new TextFormField(
                                            controller: _passwordController,
                                            obscureText: true,
                                            keyboardAppearance: Brightness.dark,
                                            decoration: new InputDecoration(
                                                labelText: 'PASSWORD',
                                                labelStyle: new TextStyle(fontSize: 13.0),
                                            ),
                                        ),
                                    ),
                                    new Container(
                                        child: new FlatButton(
                                            child: new Text('SUBMIT'),
                                            onPressed: () => {
                                                this._email = this._emailController.text,
                                                this._password = this._passwordController.text,

                                                if (this._emailController.text.isEmpty || this._passwordController.text.isEmpty) {
                                                    showDialog(
                                                        context: context,
                                                        builder: (BuildContext context) {
                                                            return new AlertDialog(
                                                                title: new Text('Email / password field may not be empty!'),
                                                                actions: <Widget>[
                                                                    new FlatButton(
                                                                        child: new Text('OK'),
                                                                        onPressed: () => Navigator.pop(context),
                                                                    ),
                                                                ]
                                                            );
                                                        }
                                                    )
                                                },

                                                this._userAPIService.signUpUser(this._email, this._password)
                                                    .then((token) => {
                                                        if (token != null) {
                                                            this._sessionTokenStorage.storeNewSessionToken('sessionToken', this._sessionToken),
                                                            Navigator.of(context).popAndPushNamed('/'),        
                                                        } else {
                                                            Scaffold.of(context).showSnackBar(new SnackBar(
                                                                    content: new Text('There was a problem creating a new user.\nPlease try again!'),
                                                                )
                                                            ),
                                                        },
                                                    }),
                                            },
                                        ),
                                    ),
                                ],
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}