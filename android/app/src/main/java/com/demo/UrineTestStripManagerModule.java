package com.demo;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class UrineTestStripManagerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public UrineTestStripManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UrineTestStripManager";
    }

    @ReactMethod
    public void findTestStrip(String filePath, Promise promise) {
        try {
            // Result should contain the following data:
            WritableMap result = Arguments.createMap();

            result.putString("uri", "path/to/image/file");
            result.putInt("width", 300);
            result.putInt("height", 1000);

            promise.resolve(result); // pass result to resolve
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e);
        }
    }

    @ReactMethod
    public void findColorBlocks(String filePath, Promise promise) {
        try {
            WritableMap result = Arguments.createMap();

            // result.putArray("colors", ArrayOfColorBlocks);
            result.putString("uri", "path/to/image/file");
            result.putInt("width", 300);
            result.putInt("height", 1000);

            promise.resolve(result); // pass result to resolve
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error", e);
        }
    }
}
