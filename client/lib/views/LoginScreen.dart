import 'package:client/services/UserAPIService.dart';
import 'package:client/util/SessionTokenStorage.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
    @override
    _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
    final TextEditingController _emailController = new TextEditingController();
    final TextEditingController _passwordController = new TextEditingController();

    final SessionTokenStorage _sessionTokenStorage = new SessionTokenStorage();
    final UserAPIService _userAPIService = new UserAPIService(); 
    
    @override
    void initState() {
        super.initState();
    }

    @override
    Widget build(BuildContext context) {
        return new Scaffold(
            body: new Builder(
                builder: (context) => new Container(
                    padding: new EdgeInsets.all(20.0),
                    child: new Column(
                        children: <Widget>[
                            new SizedBox(height: 20.0),
                            new Text(
                                'Login Credentials',
                            ), 
                            new SizedBox(height: 20.0),
                            new TextFormField(
                                controller: this._emailController,
                                keyboardType: TextInputType.emailAddress,
                                keyboardAppearance: Brightness.dark,
                                decoration: new InputDecoration(
                                    labelText: 'Email address',
                                ),
                            ),
                            new TextFormField(
                                controller: this._passwordController,
                                obscureText: true,
                                decoration: new InputDecoration(
                                    labelText: 'Password',
                                ),
                            ),
                            new SizedBox(height: 20.0),
                            new RaisedButton(
                                child: new Text('Submit'),
                                onPressed: () => {
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
                                    this._sessionTokenStorage.storeNewSessionToken('email', this._emailController.text),
                                    this._userAPIService.loginUser(this._emailController.text, this._passwordController.text)
                                        .then((token) => {
                                            print(token),
                                            if (token != null) {
                                                this._sessionTokenStorage.storeNewSessionToken('sessionToken', token),
                                                Navigator.popAndPushNamed(context, '/'),
                                            } else {
                                                Scaffold.of(context).showSnackBar(new SnackBar(
                                                    content: new Text('There was an error trying to login. Please try again!'),
                                                ))
                                            }
                                        }),
                                },
                            ),
                            new Center(
                                child: new InkWell(
                                    child: new Text('Not a user yet? Sign up here!'),
                                    onTap: () => Navigator.of(context).popAndPushNamed('/signup')
                                ),
                            ),
                        ],
                    ),
                ),
            ),
        );
    }
}