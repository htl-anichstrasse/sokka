class User {
    String _userEmail;
    String _userPassword;

    User(final String email, final String password) {
        this._userEmail = email;
        this._userPassword = password;
    }

    String get getUserEmail => _userEmail;
    String get getUserPassword => _userPassword;
}