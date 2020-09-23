class Account {
    String _userEmail;

    Account(final String userEmail) {
        _userEmail = userEmail;
    }

    String get getUserEmail => _userEmail;
}