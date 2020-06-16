package com.example.client

/**
 * @author Nicolaus Rossi
 * @since 2020-06-16
 */

import androidx.annotation.NonNull;

class TransitionedSplashScreen: SplashScreen() {
    lateinit private var mySplashView: MySplashView;

    @Nullable
    override fun createSplashView(@NonNull context: Context, @Nullable savedInstanceState: Bundle): View {
        return MySplashView(context); 
    }

    override fun transitionToFlutter(@NonNull onTransitionComplete: Runnable) {
        onTransitionComplete.run();
    }
}